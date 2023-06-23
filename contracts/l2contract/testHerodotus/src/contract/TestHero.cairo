use starknet::ContractAddress;
use openzeppelin::token::erc20::IERC20;


    #[derive(Copy, Drop, Serde)]
    struct StorageSlot {
        word_1: felt252,
        word_2: felt252,
        word_3: felt252,
        word_4: felt252,
    }

#[abi]
trait IFactRegistery {
    fn get_storage(
        block: felt252,
        account_160: felt252,
        slot: StorageSlot,
        proof_sizes_bytes_len: felt252,
        proof_sizes_bytes: felt252,
        proof_sizes_words_len: felt252,
        proof_sizes_words: felt252,
        proofs_concat_len: felt252,
        proofs_concat: felt252,
    ) -> (felt252, felt252, felt252);
    
    fn get_storage_uint(
        block: felt252,
        account_160: felt252,
        slot: StorageSlot,
        proof_sizes_bytes: Array<felt252>,
        proof_sizes_words: Array<felt252>,
        proofs_concat: Array<felt252>,
    ) -> u256;
}

#[contract]
mod TestHero {
        use starknet::StorageAccess;
    use starknet::StorageBaseAddress;
    use starknet::SyscallResult;
    use starknet::storage_read_syscall;
    use starknet::storage_write_syscall;
    use starknet::storage_address_from_base_and_offset;
    use traits::{Into, TryInto};
        use super::IFactRegistery;
    use super::IFactRegisteryDispatcher;
    use super::IFactRegisteryDispatcherTrait;
        use super::StorageSlot;
    use array::ArrayTrait;
        use super::ContractAddress;
        
    use option::OptionTrait;


    const STALED_LIMIT_PERIOD : u64 = 360;
    const WAD : u256 = 1000000000000000000;
    const HALF_WAD : u256 = 500000000000000000;


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

extern fn contract_address_try_from_felt252(
    address: felt252
) -> Option<ContractAddress> implicits(RangeCheck) nopanic;


impl Felt252TryIntoContractAddress of TryInto<felt252, ContractAddress> {
    fn try_into(self: felt252) -> Option<ContractAddress> {
        contract_address_try_from_felt252(self)
    }
}


    #[derive(Copy, Drop, Serde)]
    struct ParticipantInfo {
        user: ContractAddress,
        share_price: u256,
        timestamp: u64,
    }

    impl ParticipantInfoStorageAccess of StorageAccess::<ParticipantInfo> {

    fn write(address_domain: u32, base: StorageBaseAddress, value: ParticipantInfo) -> SyscallResult::<()> {
        storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 0_u8),
          value.user.into()
        );

        storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 1_u8),
          value.share_price.low.into()
        );

        storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 2_u8),
          value.share_price.high.into()
        );

         storage_write_syscall(
          address_domain,
          storage_address_from_base_and_offset(base, 3_u8),
          value.timestamp.into()
        )
      }

       
      fn read(address_domain: u32, base: StorageBaseAddress) -> SyscallResult::<ParticipantInfo> {
        Result::Ok(
          ParticipantInfo {
            user: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 0_u8))?.try_into().expect('not ContractAddress'),
            share_price: u256 {
    low:  storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 1_u8))?.try_into().expect('not u128'),
    high: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 2_u8))?.try_into().expect('not u128'),
    },
                timestamp: storage_read_syscall(address_domain,storage_address_from_base_and_offset(base, 3_u8))?.try_into().expect('not u64'),
          }
        )
      }
      
}


    struct Storage {
        _yearn_vault: felt252,
        _yearn_token_balance_slot: StorageSlot,
        _fact_registery: IFactRegisteryDispatcher,
        _mich: ParticipantInfo
    }

    #[constructor]
    fn constructor(
        yearn_vault: felt252, 
        yearn_token_balance_slot: StorageSlot, 
        fact_registery: ContractAddress,
        mich: ParticipantInfo) {
        initializer(yearn_vault, yearn_token_balance_slot, fact_registery, mich);
    }


    #[external]
    fn update_yearn_vault(yearn_vault: felt252) {
        _yearn_vault::write(yearn_vault);
    }

    #[external]
    fn update_yearn_token_balance_slot(yearn_token_balance_slot: StorageSlot) {
        _yearn_token_balance_slot::write(yearn_token_balance_slot);
    }

        #[external]
    fn update_fact_registery(fact_registery: ContractAddress) {
        _fact_registery::write(IFactRegisteryDispatcher { contract_address: fact_registery });
    }

    #[external]
    fn call_hero(block: felt252, proof_sizes_bytes: Array<felt252>, proof_sizes_words: Array<felt252>, proofs_concat: Array<felt252>) -> u256 {
        let fact_registery = _fact_registery::read();
        fact_registery.get_storage_uint(block, _yearn_vault::read(), _yearn_token_balance_slot::read(), proof_sizes_bytes, proof_sizes_words,proofs_concat )
    }

    #[external]
    fn convert_to_shares()  {
        if WAD == 0.into() {
                let z = 3;
            } else {
                let z = 4;
            }
    }


   

    fn initializer(
        yearn_vault: felt252, 
        yearn_token_balance_slot: StorageSlot, 
        fact_registery: ContractAddress,
        mich: ParticipantInfo) {
        update_yearn_vault(yearn_vault);
        update_yearn_token_balance_slot(yearn_token_balance_slot);
        update_fact_registery(fact_registery);
        let yo = _mich::read();
        _mich::write(mich);
    }

}