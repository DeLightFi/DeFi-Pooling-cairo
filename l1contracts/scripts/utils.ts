export const proofOfOwnership = async (address: string, token_id: number, contract_address: string, block_number: number, mapping_storage_slot: number) => {

    const balance_slot_keccak = ethers.utils.keccak256(
        ethers.utils.concat([
            ethers.utils.defaultAbiCoder.encode(
                ['uint256'],
                [token_id]
            ),
            ethers.utils.defaultAbiCoder.encode(
                ['uint256'],
                [mapping_storage_slot]
            )
        ])
    )
    return { blockNum: block_number, slot: balance_slot_keccak }
}
