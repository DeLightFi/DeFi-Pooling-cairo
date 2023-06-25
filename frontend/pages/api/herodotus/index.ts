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

const post = async (req: NextApiRequest, res: NextApiResponse<any>) => {

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

    const callDataBalanceProof = await starknetVerify(pooling_address, proofYeanrBalance.slot, proof_blocknumber)
    const callDataReceivedProof = await starknetVerify(pooling_address, numberToStringWithLeadingZeros(mapping_storage_slot_pooling_received_eth), proof_blocknumber)
    const callDataBridgedProof = await starknetVerify(pooling_address, numberToStringWithLeadingZeros(mapping_storage_slot_pooling_bridged_eth), proof_blocknumber)

    // const yearn_proof = await herodotusProof(yearn_vault_address, proof_blocknumber)
    const pooling_proof = await herodotusProof(pooling_address, proof_blocknumber)

    // console.log(yearn_proof)
    console.log(pooling_proof)

    return res.status(200).json({
        proof_blocknumber: proof_blocknumber,
        balancedProofValue: balancedProofValue,
        receivedProofValue: receivedProofValue,
        bridgedProofValue: bridgedProofValue,
        callDataBalanceProof: callDataBalanceProof,
        callDataReceivedProof: callDataReceivedProof,
        callDataBridgedProof: callDataBridgedProof,
        // yearn_proof,
        pooling_proof
    })
}



const get = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    let taskId: string;
    if (typeof req.query.taskId === 'string') {
        taskId = req.query.taskId;
    } else if (Array.isArray(req.query.taskId)) {
        // Decide how to handle multiple values, such as taking the first value
        taskId = req.query.taskId[0];
    } else {
        // Handle the case where taskId is not provided
        taskId = ''; // or any default value you prefer
    }

    console.log("quoting task status")
    console.log(taskId)

    const result = await herodotusProofStatus(taskId)
    const status = result.taskStatus
    const resultCall = { status }
    return res.status(200).json(resultCall)
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnData>
) {
    if (req.method === 'GET') {
        get(req, res)
    } else if (req.method === 'POST') {
        post(req, res)
    } else {
        res.status(405).end()
    }
}