use starknet::ContractAddress;
use openzeppelin::token::erc20::IERC20;


#[abi]
trait IERC4626<impl ERC20Impl: IERC20> {

    /// IERC20 functions
    fn name() -> felt252;
    fn symbol() -> felt252;
    fn decimals() -> u8;
    fn total_supply() -> u256;
    fn balance_of(account: ContractAddress) -> u256;
    fn allowance(owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(recipient: ContractAddress, amount: u256) -> bool;
    fn transfer_from(sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
    fn approve(spender: ContractAddress, amount: u256) -> bool;

    /// ERC4626-specific functions
    fn asset() -> ContractAddress;
    fn total_assets() -> u256;
    fn convert_to_shares(assets: u256) -> u256;
    fn convert_to_assets(shares: u256) -> u256;
    fn max_deposit(amount: u256) -> u256;
    fn preview_deposit(assets: u256) -> u256;
    fn deposit(assets: u256, receiver: ContractAddress) -> u256;
    fn max_mint(receiver: ContractAddress) -> u256;
    fn preview_mint(shares: u256) -> u256;
    fn mint(shares: u256, receiver: ContractAddress, ) -> u256;
    fn max_withdraw(owner: ContractAddress) -> u256;
    fn preview_withdraw(assets: u256) -> u256;
    fn withdraw(assets: u256, receiver: ContractAddress, owner: ContractAddress) -> u256;
    fn max_redeem(owner: ContractAddress) -> u256;
    fn preview_redeem(shares: u256) -> u256;
    fn redeem(shares: u256, receiver: ContractAddress, owner: ContractAddress) -> u256;
}

#[contract]
mod ERC4626 {
    use super::IERC4626;
    use openzeppelin::token::erc20::ERC20;
    use openzeppelin::token::erc20::ERC20::ERC20 as ERC20Impl;
    use openzeppelin::token::erc20::IERC20Dispatcher;
    use openzeppelin::token::erc20::IERC20DispatcherTrait;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use starknet::get_contract_address;
    use starknet::ContractAddress;
    use starknet::contract_address::ContractAddressZeroable;
    use zeroable::Zeroable;
    use traits::Into;
    use traits::TryInto;
    use option::OptionTrait;
    use integer::BoundedInt;
    use debug::PrintTrait;
    use defiPooling::utils::math::MathRounding;


    const STALED_LIMIT_PERIOD : u64 = 360;

    struct Storage {
        _asset: IERC20Dispatcher,

        // L1_Stuff

        _l1_received_underying: u256,
        _l1_bridged_underying: u256,
        _l1_reserve_underlying: u256,
        _last_updated_ts: u64,

        // L2_Stuff

        _l2_received_underying: u256,
        _l2_bridged_underying: u256
    }

    #[event]
    fn Transfer(from: ContractAddress, to: ContractAddress, value: u256) {}

    #[event]
    fn Approval(owner: ContractAddress, spender: ContractAddress, value: u256) {}

    //     event Deposit(address indexed caller, address indexed owner, uint256 assets, uint256 shares);

    #[event]
    fn Deposit(caller: ContractAddress, owner: ContractAddress, asset: u256, shares: u256) {}

    #[event]
    fn Withdraw(
        caller: ContractAddress,
        receiver: ContractAddress,
        owner: ContractAddress,
        asset: u256,
        shares: u256
    ) {}


    impl ERC4626Impl of IERC4626<ERC20Impl> {
        ////////////////////////////////
        // ERC20 implementation
        ////////////////////////////////

        fn name() -> felt252 {
            ERC20Impl::name()
        }

        fn symbol() -> felt252 {
            ERC20Impl::symbol()
        }

        fn decimals() -> u8 {
            ERC20Impl::decimals()
        }

        fn total_supply() -> u256 {
            ERC20Impl::total_supply()
        }

        fn balance_of(account: ContractAddress) -> u256 {
            ERC20Impl::balance_of(account)
        }

        fn allowance(owner: ContractAddress, spender: ContractAddress) -> u256 {
            ERC20Impl::allowance(owner, spender)
        }

        fn transfer(recipient: ContractAddress, amount: u256) -> bool {
            ERC20Impl::transfer(recipient, amount)
        }

        fn transfer_from(
            sender: ContractAddress, recipient: ContractAddress, amount: u256
        ) -> bool {
            ERC20Impl::transfer_from(sender, recipient, amount)
        }

        fn approve(spender: ContractAddress, amount: u256) -> bool {
            ERC20Impl::approve(spender, amount)
        }

        ////////////////////////////////
        // ERC4626-specific implementation
        ////////////////////////////////

        fn asset() -> ContractAddress {
            _asset::read().contract_address
        }

        fn total_assets() -> u256 {
            _asset::read().balance_of(get_contract_address())
        }

        fn convert_to_shares(assets: u256) -> u256 {
            if ERC20::_total_supply::read() == 0.into() {
                assets
            } else {
                (assets * ERC20::_total_supply::read()) / ERC4626Impl::total_assets()
            }
        }

        fn convert_to_assets(shares: u256) -> u256 {
            let supply = ERC20::_total_supply::read();
            if supply == 0.into() {
                shares
            } else {
                (shares * ERC4626Impl::total_assets()) / supply
            }
        }

        fn max_deposit(amount: u256) -> u256 {
            BoundedInt::<u256>::max()
        }

        fn preview_deposit(assets: u256) -> u256 {
            ERC4626Impl::convert_to_shares(assets)
        }

        fn deposit(assets: u256, receiver: ContractAddress) -> u256 {
            assert_proof_not_staled();
            let shares = ERC4626Impl::preview_deposit(assets);
            assert(shares != 0.into(), 'ZERO_SHARES');
            let caller = get_caller_address();
            let token = _asset::read();
            let self = get_contract_address();
            token.transfer_from(caller, get_contract_address(), assets);
            ERC20::_mint(receiver, shares);
            Deposit(caller, receiver, assets, shares);
            shares
        }

        fn max_mint(receiver: ContractAddress) -> u256 {
            BoundedInt::<u256>::max()
        }

        fn preview_mint(shares: u256) -> u256 {
            // Note: since the total_supply function could be modified from the ERC20 standard here,
            // I consider it good practice to use the one defined in ERC4626Impl - as it happens in Vault.
            if ERC4626Impl::total_supply() == 0.into() {
                shares
            } else {
                (shares * ERC4626Impl::total_assets()).div_up(ERC4626Impl::total_supply())
            }
        }

        fn mint(shares: u256, receiver: ContractAddress) -> u256 {
            assert_proof_not_staled();
            let assets = ERC4626Impl::preview_mint(shares);
            let caller = get_caller_address();
            let token = _asset::read();
            let self = get_contract_address();
            token.transfer_from(caller, self, assets);
            // Note: in this case, mint is not part of IERC20, and we should theoritically use a ERC20Mintable
            // library contract. But we can also just call the internal mint function directly.
            ERC20::_mint(receiver, shares);
            Deposit(caller, receiver, assets, shares);
            shares
        }

        fn max_withdraw(owner: ContractAddress) -> u256 {
            ERC4626Impl::convert_to_assets(ERC4626Impl::balance_of(owner))
        }

        fn preview_withdraw(assets: u256) -> u256 {
            if ERC4626Impl::total_supply() == 0.into() {
                assets
            } else {
                (assets * ERC4626Impl::total_supply()).div_up(ERC4626Impl::total_assets())
            }
        }

        fn withdraw(assets: u256, receiver: ContractAddress, owner: ContractAddress) -> u256 {
            assert_proof_not_staled();
            let shares = ERC4626Impl::preview_withdraw(assets);

            if get_caller_address() != owner {
                let allowed = ERC4626Impl::allowance(owner, get_caller_address());
                if allowed != BoundedInt::<u256>::max() {
                    let new_allowed = allowed - shares;
                    // Note: here, we need to modify a storage variable of the ERC20 contract.
                    // We can directly access it under the ERC20 Module
                    ERC20::_allowances::write((owner, get_caller_address()), new_allowed);
                }
            }

            ERC20::_burn(owner, shares);
            let token = _asset::read();
            token.transfer(receiver, assets);
            Withdraw(get_caller_address(), receiver, owner, assets, shares);
            shares
        }

        fn max_redeem(owner: ContractAddress) -> u256 {
            ERC4626Impl::balance_of(owner)
        }

        fn preview_redeem(shares: u256) -> u256 {
            ERC4626Impl::convert_to_assets(shares)
        }

        fn redeem(shares: u256, receiver: ContractAddress, owner: ContractAddress) -> u256 {
            assert_proof_not_staled();
            let assets = ERC4626Impl::preview_redeem(shares);
            assert(assets != 0.into(), 'ZERO_ASSETS');

            if get_caller_address() != owner {
                let allowed = ERC4626Impl::allowance(owner, get_caller_address());
                if allowed != BoundedInt::<u256>::max() {
                    let new_allowed = allowed - shares;
                    ERC20::_allowances::write((owner, get_caller_address()), new_allowed);
                }
            }

            ERC20::_burn(owner, shares);
            let token = _asset::read();
            token.transfer(receiver, assets);
            Withdraw(get_caller_address(), receiver, owner, assets, shares);
            shares
        }
    }

    #[constructor]
    fn constructor(name: felt252, symbol: felt252, asset: ContractAddress) {
        initializer(name, symbol, asset);
    }

    ////////////////////////////////
    // ERC20 entrypoints
    ////////////////////////////////

    #[view]
    fn name() -> felt252 {
        ERC4626Impl::name()
    }

    #[view]
    fn symbol() -> felt252 {
        ERC20::symbol()
    }

    #[view]
    fn decimals() -> u8 {
        ERC4626Impl::decimals()
    }

    #[view]
    fn total_supply() -> u256 {
        ERC4626Impl::total_supply()
    }

    #[view]
    fn balance_of(account: ContractAddress) -> u256 {
        ERC4626Impl::balance_of(account)
    }

    #[view]
    fn allowance(owner: ContractAddress, spender: ContractAddress) -> u256 {
        ERC4626Impl::allowance(owner, spender)
    }

    #[external]
    fn transfer(recipient: ContractAddress, amount: u256) -> bool {
        ERC4626Impl::transfer(recipient, amount)
    }

    #[external]
    fn transfer_from(sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool {
        ERC4626Impl::transfer_from(sender, recipient, amount)
    }

    #[external]
    fn approve(spender: ContractAddress, amount: u256) -> bool {
        ERC4626Impl::approve(spender, amount)
    }

    // #[external]
    // fn increase_allowance(spender: ContractAddress, added_value: u256) -> bool {
    //     ERC20::_increase_allowance(spender, added_value)
    // }

    // #[external]
    // fn decrease_allowance(spender: ContractAddress, subtracted_value: u256) -> bool {
    //     ERC20::_decrease_allowance(spender, subtracted_value)
    // }

    ////////////////////////////////////////////////////////////////
    // ERC4626 functions
    ////////////////////////////////////////////////////////////////

    #[view]
    fn asset() -> ContractAddress {
        ERC4626Impl::asset()
    }

    #[view]
    fn total_assets() -> u256 {
        ERC4626Impl::total_assets()
    }

    #[view]
    fn convert_to_shares(assets: u256) -> u256 {
        ERC4626Impl::convert_to_shares(assets)
    }

    #[view]
    fn convert_to_assets(shares: u256) -> u256 {
        ERC4626Impl::convert_to_assets(shares)
    }

    #[view]
    fn max_deposit(amount: u256) -> u256 {
        ERC4626Impl::max_deposit(amount)
    }

    #[view]
    fn preview_deposit(assets: u256) -> u256 {
        ERC4626Impl::preview_deposit(assets)
    }

    #[external]
    fn deposit(assets: u256, receiver: ContractAddress) -> u256 {
        ERC4626Impl::deposit(assets, receiver)
    }

    #[view]
    fn max_mint(receiver: ContractAddress) -> u256 {
        ERC4626Impl::max_mint(receiver)
    }

    #[view]
    fn preview_mint(shares: u256) -> u256 {
        ERC4626Impl::preview_mint(shares)
    }

    #[external]
    fn mint(shares: u256, receiver: ContractAddress) -> u256 {
        ERC4626Impl::mint(shares, receiver)
    }

    #[view]
    fn max_withdraw(owner: ContractAddress) -> u256 {
        ERC4626Impl::max_withdraw(owner)
    }

    #[view]
    fn preview_withdraw(assets: u256) -> u256 {
        ERC4626Impl::preview_withdraw(assets)
    }

    #[external]
    fn withdraw(assets: u256, receiver: ContractAddress, owner: ContractAddress) -> u256 {
        ERC4626Impl::withdraw(assets, receiver, owner)
    }

    #[view]
    fn max_redeem(owner: ContractAddress) -> u256 {
        ERC4626Impl::max_redeem(owner)
    }

    #[view]
    fn preview_redeem(shares: u256) -> u256 {
        ERC4626Impl::preview_redeem(shares)
    }

    #[external]
    fn redeem(shares: u256, receiver: ContractAddress, owner: ContractAddress) -> u256 {
        ERC4626Impl::redeem(shares, receiver, owner)
    }

    ///
    /// Internals
    ///

    fn initializer(name: felt252, symbol: felt252, asset: ContractAddress) {
        ERC20::initializer(name, symbol);
        _asset::write(IERC20Dispatcher { contract_address: asset });
    }

    fn time_since_last_update() -> u64{
        get_block_timestamp() - _last_updated_ts::read()
    }

    fn is_proof_staled() -> bool{
        time_since_last_update() >= STALED_LIMIT_PERIOD
    }

    fn assert_proof_not_staled(){
        assert(is_proof_staled() == false, 'PROOF_EXPIRED');
    }




}