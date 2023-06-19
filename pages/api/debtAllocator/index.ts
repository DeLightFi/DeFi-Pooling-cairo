import type { NextApiRequest, NextApiResponse } from 'next'
import { ethGetProof, ethGetStorageAt, getCurrentBlockNum, herodotusProof, herodotusProofStatus, proofOfOwnership, proofOfOwnershipL1PoolingBalance, starknetVerify } from '../blockInfo'
type ReturnData = {
    coupons: any
}

let mapping_storage_slot_yearn_balance = 7
let yearn_vault_address = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
let mapping_storage_slot_pooling_received_eth = 3
let mapping_storage_slot_pooling_bridged_eth = 4
let pooling_address = "0x4559035A77Cfbbcc1af18c47118e90A89D7C1673"

const POOLING = "0x4559035A77Cfbbcc1af18c47118e90A89D7C1673"


const post = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    // get latest block number
    const proof_blocknumber = await getCurrentBlockNum()

    //get proof of balance of Y_ETH token
    const proofYeanrBalance = await proofOfOwnershipL1PoolingBalance(pooling_address, mapping_storage_slot_yearn_balance)
    if (!proofYeanrBalance) return res.status(500).json([])

    console.log(proofYeanrBalance)

    const value = await ethGetStorageAt(yearn_vault_address, proofYeanrBalance.slot, proof_blocknumber)
    console.log(value)
    const ethProof = await ethGetProof(yearn_vault_address, [proofYeanrBalance.slot], proof_blocknumber)
    console.log(ethProof)

    //generate check user's proof and validate it send it to factregistery

    const promises = [
        await herodotusProof(yearn_vault_address, proof_blocknumber),
        // herodotusProof(pooling_address, proof_blocknumber)
    ];


    // Promise.all(promises)
    //     .then((values) => {
    //         console.log('All herodotusProof calls completed successfully.');
    //         console.log(values[0])
    //     })
    //     .catch(error => {
    //         console.error('An error occurred during herodotusProof calls:', error);
    //     });



    // after passing herodotus validation, we can get proof from ethereum and starknetverify it. Why? we need this for get_storage_uint for factregistery


    // const outputYearnTokenBalance = await starknetVerify(yearn_vault_address, proofYeanrBalance?.slot, proof_blocknumber)
    // console.log(outputYearnTokenBalance)

    // const outputReceivedEth = await starknetVerify(yearn_vault_address, mapping_storage_slot_pooling_received_eth.toString(), proof_blocknumber)
    // const outputBridgedEth = await starknetVerify(yearn_vault_address, mapping_storage_slot_pooling_bridged_eth.toString(), proof_blocknumber)

    // const calldata = [proof_blocknumber, yearn_vault_address, outputYearnTokenBalance.slot, outputYearnTokenBalance.proof_sizes_bytes, outputYearnTokenBalance.proof_sizes_words, outputYearnTokenBalance.proofs_concat]

    // console.log(calldata)
    // const result = { calldata }
    const result = {}
    return res.status(200).json(result)
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