import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethGetProof, ethGetStorageAt, getCurrentBlockNum, herodotusProof, herodotusProofStatus, proofOfOwnership, proofOfOwnershipL1PoolingBalance, starknetVerify } from '../blockInfo'
type ReturnData = {
    coupons: any
}

let mapping_storage_slot_pooling_received_eth = 3
let mapping_storage_slot_pooling_bridged_eth = 4
let pooling_address = "0x4559035A77Cfbbcc1af18c47118e90A89D7C1673"
let mapping_storage_slot_yearn_balance = 7
let yearn_vault_address = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"


const get = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    // get latest block number
    const proof_blocknumber = await getCurrentBlockNum()
    const proofYeanrBalance = await proofOfOwnershipL1PoolingBalance(pooling_address, mapping_storage_slot_yearn_balance)
    if (!proofYeanrBalance) return res.status(500).json([])
    console.log(proofYeanrBalance)
    // Get Values
    const balanceProofResponse = await ethGetProof(yearn_vault_address, [proofYeanrBalance.slot], proof_blocknumber)
    const balancedProofValue = ethers.BigNumber.from(balanceProofResponse.storageProof[0].value).toString();
    console.log(balancedProofValue)

    const receivedProofResponse = await ethGetProof(pooling_address, [mapping_storage_slot_pooling_received_eth.toString()], proof_blocknumber)
    const receivedProofValue = ethers.BigNumber.from(receivedProofResponse.storageProof[0].value).toString();
    console.log(receivedProofValue)

    const bridgedProofResponse = await ethGetProof(pooling_address, [mapping_storage_slot_pooling_bridged_eth.toString()], proof_blocknumber)
    const bridgedProofValue = ethers.BigNumber.from(bridgedProofResponse.storageProof[0].value).toString();
    console.log(bridgedProofValue)
    return res.status(200).json({
        proof_blocknumber: proof_blocknumber,
        balancedProofValue: balancedProofValue,
        receivedProofValue: receivedProofValue,
        bridgedProofValue: bridgedProofValue
    })
}



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnData>
) {
    if (req.method === 'GET') {
        get(req, res)
    }
    else {
        res.status(405).end()
    }
}