use starknet::ContractAddress;
use openzeppelin::token::erc20::IERC20;
use array::ArrayTrait;


    #[derive(Copy, Drop, Serde)]
    struct StorageSlot {
        word_1: felt252,
        word_2: felt252,
        word_3: felt252,
        word_4: felt252,
    }

#[abi]
trait IFactRegistery {
    fn get_storage_uint(
        block: felt252,
        account_160: felt252,
        slot: StorageSlot,
        proof_sizes_bytes: Array<felt252>,
        proof_sizes_words: Array<felt252>,
        proofs_concat: Array<felt252>,
    ) -> u256;
}

#[abi]
trait IStarkGate{
    fn initiate_withdraw(
        l1_recipient: felt252,
        amount: u256
    ); 
}



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
    use super::IStarkGateDispatcher;
    use super::IStarkGateDispatcherTrait;
    use super::IFactRegistery;
    use super::IFactRegisteryDispatcher;
    use super::IFactRegisteryDispatcherTrait;
    use super::StorageSlot;
    use openzeppelin::token::erc20::ERC20;
    use openzeppelin::token::erc20::ERC20::ERC20 as ERC20Impl;
    use openzeppelin::token::erc20::IERC20Dispatcher;
    use openzeppelin::token::erc20::IERC20DispatcherTrait;
    use ownable::contract::Ownable::Ownable;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use starknet::get_contract_address;
    use starknet::ContractAddress;
    use starknet::EthAddress;
    use starknet::EthAddressIntoFelt252;
    use starknet::send_message_to_l1_syscall;
    use starknet::contract_address::ContractAddressZeroable;
    use starknet::StorageAccess;
    use starknet::StorageBaseAddress;
    use starknet::SyscallResult;
    use starknet::storage_read_syscall;
    use starknet::storage_write_syscall;
    use starknet::storage_address_from_base_and_offset;
    use traits::{Into, TryInto};
    use zeroable::Zeroable;
    use option::OptionTrait;
    use integer::BoundedInt;
    use debug::PrintTrait;
    use defiPooling::utils::math::MathRounding;
    use defiPooling::utils::math::mul_div_down;
    use super::ArrayTrait;



    impl StorageSlotStorageAccess of StorageAccess::<StorageSlot> {

    fn write(address_domain: u32, base: StorageBaseAddress, value: StorageSlot) -> SyscallResult::<()> {
        storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 0_u8),
          value.word_1
        );

        storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 1_u8),
          value.word_2
        );

        storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 2_u8),
          value.word_3
        );

         storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 3_u8),
          value.word_4
        )
      }

       
      fn read(address_domain: u32, base: StorageBaseAddress) -> SyscallResult::<StorageSlot> {
        Result::Ok(
          StorageSlot {
            word_1: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 0_u8))?,
            word_2: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 1_u8))?,
            word_3: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 2_u8))?,
            word_4: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 3_u8))?,
          }
        )
      }
      
}





    


    const STALED_LIMIT_PERIOD : u64 = 360;
    const WAD : u256 = 1000000000000000000;
    const HALF_WAD : u256 = 500000000000000000;

    struct Storage {
        _asset: IERC20Dispatcher,
        _bridge: IStarkGateDispatcher,
        _fact_registery: IFactRegisteryDispatcher, 
        _l1_pooling: felt252,
        _yearn_vault: felt252,
        _yearn_token_pricefeed_id: felt252,

        // slots
        _yearn_token_balance_slot: StorageSlot,
        _pooling_received_underlying_slot: StorageSlot,
        _pooling_bridged_underlying_slot: StorageSlot,

        // protocol parameters
        _rebalancing_threshold: u256,
        _ideal_l2_underlying_ratio: u256,


        // bridge control states
        _yearn_token_balance: u256,
        _l2_received_underying: u256,
        _l2_bridged_underying: u256,
        _l1_received_underying: u256,
        _l1_bridged_underying: u256,
        _pending_withdrawal: u256,

        // protocol participants
        _last_l1_bridger: ContractAddress,
        _last_l1_bridger_timestamp: u64,
        _last_l2_bridger: ContractAddress,
        _last_l2_bridger_timestamp: u64,
        _last_data_prover: ContractAddress,
        _last_data_prover_timestamp: u64
    }

    #[event]
    fn Transfer(from: ContractAddress, to: ContractAddress, value: u256) {}

    #[event]
    fn Approval(owner: ContractAddress, spender: ContractAddress, value: u256) {}

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

    #[event]
    fn BridgeFromL2(
        to: felt252,
        amount: u256,
    ) {}

    #[event]
    fn BridgeFromL1(
        to: felt252,
        amount: u256,
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

        fn max_mint(receiver: ContractAddress) -> u256 {
            BoundedInt::<u256>::max()
        }

        fn preview_withdraw(assets: u256) -> u256 {
            if ERC4626Impl::total_supply() == 0.into() {
                assets
            } else {
                (assets * ERC4626Impl::total_supply()).div_up(ERC4626Impl::total_assets())
            }
        }

        fn withdraw(assets: u256, receiver: ContractAddress, owner: ContractAddress) -> u256 {
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
    fn constructor(
        name: felt252, 
        symbol: felt252, 
        asset: ContractAddress, 
        bridge: ContractAddress, 
        fact_registery: ContractAddress,
        yearn_vault: felt252, 
        yearn_token_pricefeed_id: felt252, 
        yearn_token_balance_slot: StorageSlot, 
        pooling_bridged_underlying_slot: StorageSlot, 
        pooling_received_underlying_slot: StorageSlot,
        ideal_l2_underlying_ratio: u256, 
        rebalancing_threshold: u256) {
        initializer(name, symbol, asset, bridge, fact_registery, yearn_vault, yearn_token_pricefeed_id, yearn_token_balance_slot, pooling_bridged_underlying_slot, pooling_received_underlying_slot, ideal_l2_underlying_ratio, rebalancing_threshold);
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
    


    ////////////////////////////////////////////////////////////////
    // Governance
    ////////////////////////////////////////////////////////////////

    #[external]
    fn update_l1_pooling(l1_pooling_address: felt252) {
        Ownable::assert_only_owner();
        _l1_pooling::write(l1_pooling_address);
    }

    #[external]
    fn update_bridge(bridge: ContractAddress) {
        Ownable::assert_only_owner();
        _bridge::write(IStarkGateDispatcher { contract_address: bridge });
    }

    #[external]
    fn update_fact_registery(fact_registery: ContractAddress) {
        Ownable::assert_only_owner();
        _fact_registery::write(IFactRegisteryDispatcher { contract_address: fact_registery });
    }

    #[external]
    fn update_yearn_vault(yearn_vault: felt252) {
        Ownable::assert_only_owner();
        _yearn_vault::write(yearn_vault);
    }

    #[external]
    fn update_yearn_token_pricefeed_id(yearn_token_pricefeed_id: felt252) {
        Ownable::assert_only_owner();
        _yearn_token_pricefeed_id::write(yearn_token_pricefeed_id);
    }

    #[external]
    fn update_yearn_token_balance_slot(yearn_token_balance_slot: StorageSlot) {
        Ownable::assert_only_owner();
        _yearn_token_balance_slot::write(yearn_token_balance_slot);
    }

    #[external]
    fn update_pooling_bridged_underlying_slot(pooling_bridged_underlying_slot: StorageSlot) {
        Ownable::assert_only_owner();
        _pooling_bridged_underlying_slot::write(pooling_bridged_underlying_slot);
    }


    #[external]
    fn update_pooling_received_underlying_slot(pooling_received_underlying_slot: StorageSlot) {
        Ownable::assert_only_owner();
        _pooling_received_underlying_slot::write(pooling_received_underlying_slot);
    }


    #[external]
    fn update_ideal_l2_underlying_ratio(ideal_l2_underlying_ratio: u256) {
        Ownable::assert_only_owner();
        _ideal_l2_underlying_ratio::write(ideal_l2_underlying_ratio);
    }


    #[external]
    fn update_rebalancing_threshold(rebalancing_threshold: u256) {
        Ownable::assert_only_owner();
        _rebalancing_threshold::write(rebalancing_threshold);
    }


    ////////////////////////////////////////////////////////////////
    // Participants
    ////////////////////////////////////////////////////////////////



    #[external]
    fn handle_bridge_from_l2() {
        assert(limit_up_l2_assets() < l2_reserve(), 'ENOUGH_UNDERLYING_ON_L1');
        let bridge = _bridge::read();
        let token = _asset::read();
        let underlying_to_bridge = l2_reserve() - ideal_l2_reserve_underlying();
        token.approve(bridge.contract_address, underlying_to_bridge);
        bridge.initiate_withdraw(_l1_pooling::read() ,underlying_to_bridge);
        _l2_bridged_underying::write(_l2_bridged_underying::read() + underlying_to_bridge);

        // we need a second message to tell the amount we need to get from the bridge, as everyone is able to send money to the l1 pooling contract (accountability)
        let mut payload: Array<felt252> = ArrayTrait::new();
        payload.append(underlying_to_bridge.low.into());
        payload.append(underlying_to_bridge.high.into());
        send_message_to_l1_syscall(_l1_pooling::read(), payload.span());

        BridgeFromL2(_l1_pooling::read(), underlying_to_bridge);
    }

    #[external]
    fn handle_bridge_from_l1() {
        assert(limit_down_l2_assets() > l2_reserve(), 'ENOUGH_UNDERLYING_ON_L2');
        assert_not_pending_withdrawal();
        let bridge = _bridge::read();
        let token = _asset::read();
        let underlying_to_bridge = ideal_l2_reserve_underlying() - l2_reserve();
        let mut payload: Array<felt252> = ArrayTrait::new();
        payload.append(underlying_to_bridge.low.into());
        payload.append(underlying_to_bridge.high.into());
        send_message_to_l1_syscall(_l1_pooling::read(), payload.span());
        _pending_withdrawal::write(underlying_to_bridge);
        BridgeFromL1(_l1_pooling::read(), underlying_to_bridge);
    }

    #[external]
    fn submit_all_proof(block: felt252, proof_sizes_bytes_yearn_balance: Array<felt252>, proof_sizes_words_yearn_balance: Array<felt252>, proofs_concat_yearn_balance: Array<felt252>, proof_sizes_bytes_bridged_l1: Array<felt252>, proof_sizes_words_bridged_l1: Array<felt252>, proofs_concat_bridged_l1: Array<felt252>, proof_sizes_bytes_received_l1: Array<felt252>, proof_sizes_words_received_l1: Array<felt252>, proofs_concat_received_l1: Array<felt252>)  {
        let is_new_balance = submit_proof_yearn_balance(block, proof_sizes_bytes_yearn_balance, proof_sizes_words_yearn_balance, proofs_concat_yearn_balance);
        let is_new_bridged_amount = submit_proof_bridged_l1(block, proof_sizes_bytes_bridged_l1, proof_sizes_words_bridged_l1, proofs_concat_bridged_l1);
        let is_new_received_amount = submit_proof_received_l1(block, proof_sizes_bytes_received_l1, proof_sizes_words_received_l1, proofs_concat_received_l1);
        if(is_new_balance == false ){ // need &&
            if(is_new_bridged_amount == false){
                assert(is_new_received_amount == true, 'NOTHING_TO_UPDATE');
            }
        }
        init_stream(get_caller_address());
    }

    fn submit_proof_yearn_balance(block: felt252,proof_sizes_bytes: Array<felt252>, proof_sizes_words: Array<felt252>, proofs_concat: Array<felt252>) -> bool {
        let value = call_hero(block,_yearn_vault::read(), _yearn_token_balance_slot::read(), proof_sizes_bytes, proof_sizes_words, proofs_concat);
        if(value == _yearn_token_balance::read()){
            _yearn_token_balance::write(value);
            true
        } else {
            false
        }
    }

    fn submit_proof_bridged_l1(block: felt252, proof_sizes_bytes: Array<felt252>, proof_sizes_words: Array<felt252>, proofs_concat: Array<felt252>) -> bool {
        let value = call_hero(block, _l1_pooling::read(), _pooling_bridged_underlying_slot::read(), proof_sizes_bytes, proof_sizes_words, proofs_concat);
        if(value == _l1_received_underying::read()){
            _l1_bridged_underying::write(value);
            true
        } else {
            false
        }
    }

    fn submit_proof_received_l1(block: felt252, proof_sizes_bytes: Array<felt252>, proof_sizes_words: Array<felt252>, proofs_concat: Array<felt252>) -> bool {
        let value = call_hero(block, _l1_pooling::read(), _pooling_received_underlying_slot::read(), proof_sizes_bytes, proof_sizes_words, proofs_concat);
        if(value == _l1_received_underying::read()){
            _l1_received_underying::write(value);
            true
        } else {
            false
        }
    }




    // Starkgate send ETH to an address first, we have to collect funds from receiver, here set to the owner, that can't be this address (accountability)
    #[external]
    fn handle_get_available_bridge_money() {
        Ownable::assert_only_owner();
        ERC20::transfer_from(Ownable::owner(), get_contract_address(), _pending_withdrawal::read());
        _l2_received_underying::write(_l2_received_underying::read() + _pending_withdrawal::read());
        _pending_withdrawal::write(0.into());
    }

    ///
    /// Internals
    ///

    fn initializer(
        name: felt252, 
        symbol: felt252, 
        asset: ContractAddress, 
        bridge: ContractAddress, 
        fact_registery: ContractAddress,
        yearn_vault: felt252, 
        yearn_token_pricefeed_id: felt252, 
        yearn_token_balance_slot: StorageSlot, 
        pooling_bridged_underlying_slot: StorageSlot, 
        pooling_received_underlying_slot: StorageSlot,
        ideal_l2_underlying_ratio: u256, 
        rebalancing_threshold: u256) {

        ERC20::initializer(name, symbol);
        Ownable::initializer();
        _asset::write(IERC20Dispatcher { contract_address: asset });
        update_bridge(bridge);
        update_fact_registery(fact_registery);
        update_yearn_vault(yearn_vault);
        update_yearn_token_pricefeed_id(yearn_token_pricefeed_id);
        update_yearn_token_balance_slot(yearn_token_balance_slot);
        update_pooling_bridged_underlying_slot(pooling_bridged_underlying_slot);
        update_pooling_received_underlying_slot(pooling_received_underlying_slot);
        update_ideal_l2_underlying_ratio(ideal_l2_underlying_ratio);
        update_rebalancing_threshold(rebalancing_threshold);
    }


    fn ideal_l2_reserve_underlying() -> u256 {
        mul_div_down(_ideal_l2_underlying_ratio::read(), total_assets(), WAD)
    }

    fn limit_up_l2_assets() -> u256{
        ideal_l2_reserve_underlying() + mul_div_down(ideal_l2_reserve_underlying(), _rebalancing_threshold::read(), WAD) 
    }

    fn limit_down_l2_assets() -> u256{
        ideal_l2_reserve_underlying() - mul_div_down(ideal_l2_reserve_underlying(), _rebalancing_threshold::read(), WAD) 
    }

    fn l2_reserve() -> u256{
        _asset::read().balance_of(get_contract_address()) 
    }

    fn l2_to_l1_transit() -> u256 {
        _l2_bridged_underying::read() - _l1_received_underying::read()
    }

    fn l1_reserve() -> u256 {
        _l2_bridged_underying::read()
    }

    fn l1_to_l2_transit() -> u256 {
        _l1_bridged_underying::read() - _l2_received_underying::read()
    }

    fn assert_not_pending_withdrawal() {
        assert(_pending_withdrawal::read() == 0.into(), 'PENDING_WITHDRAWAL');
    }

    fn assert_l1_pooling_register() {
        assert(_l1_pooling::read().is_zero() == false, 'L1_POOLING_NOT_REGISTER');
    }

    fn call_hero(block: felt252, account_address: felt252, slot: StorageSlot,proof_sizes_bytes: Array<felt252>, proof_sizes_words: Array<felt252>, proofs_concat: Array<felt252>) -> u256 {
        let fact_registery = _fact_registery::read();
        fact_registery.get_storage_uint(block, account_address, slot, proof_sizes_bytes, proof_sizes_words,proofs_concat)
    }


}