import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethGetProof, ethGetStorageAt, getCurrentBlockNum, herodotusProof, herodotusProofStatus, proofOfOwnership, proofOfOwnershipL1PoolingBalance, starknetVerify } from '../blockInfo'
type ReturnData = {
    coupons: any
}

let mapping_storage_slot_pooling_received_eth = 4
let mapping_storage_slot_pooling_bridged_eth = 5
let pooling_address = "0xb273c84Af2C533934b5eBcaCE450427c30059dB6"
let mapping_storage_slot_yearn_balance = 7
let yearn_vault_address = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"

function numberToStringWithLeadingZeros(number: number): string {
    const hexString = `0x${number.toString(16).padStart(64, '0')}`;
    return hexString;
}



const get = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    let _proof_blocknumber: string;
    if (typeof req.query.block === 'string') {
        _proof_blocknumber = req.query.block;
    } else if (Array.isArray(req.query.block)) {
        // Decide how to handle multiple values, such as taking the first value
        _proof_blocknumber = req.query.block[0];
    } else {
        // Handle the case where taskId is not provided
        return res.status(200).json({ status: "error" })
    }
    // get latest block number
    const proof_blocknumber = parseFloat(_proof_blocknumber)

    const proofYeanrBalance = await proofOfOwnershipL1PoolingBalance(pooling_address, mapping_storage_slot_yearn_balance)
    if (!proofYeanrBalance) return res.status(500).json([])

    const balanceProofResponse = await ethGetProof(yearn_vault_address, [proofYeanrBalance.slot], proof_blocknumber)
    const balancedProofValue = ethers.BigNumber.from(balanceProofResponse.storageProof[0].value).toString();
    const callDataBalanceProof = await starknetVerify(pooling_address, proofYeanrBalance.slot, proof_blocknumber)
    const callDataReceivedProof = await starknetVerify(pooling_address, numberToStringWithLeadingZeros(mapping_storage_slot_pooling_received_eth), proof_blocknumber)
    const callDataBridgedProof = await starknetVerify(pooling_address, numberToStringWithLeadingZeros(mapping_storage_slot_pooling_bridged_eth), proof_blocknumber)

    return res.status(200).json({
        yearnBalance: balancedProofValue,
        callDataBalanceProof: callDataBalanceProof,
        callDataReceivedProof: callDataReceivedProof,
        callDataBridgedProof: callDataBridgedProof
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