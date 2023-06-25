import { BigNumber, ethers } from 'ethers'
import { Data } from "../../utils/data"


export const getTxsInBlockInterval = async (fromBlock: number, toBlock: number, contractAddress: string, walletAddress: string) => {
    const req = await fetch("https://thrumming-wiser-wind.ethereum-goerli.discover.quiknode.pro/c04504dec720c90cd6d6f952254cccbe44923a62/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 0,
            "method": "eth_getLogs",
            "params": [
                {
                    "fromBlock": `0x${fromBlock.toString(16)}`,
                    "toBlock": `0x${toBlock.toString(16)}`,
                    "address": contractAddress,
                    "topics": [
                        null,
                        `0x000000000000000000000000${walletAddress.slice(2)}`
                    ]
                }
            ]
        })
    })

    const data = await req.json()
    return data.result
}

// Getting the block number by transaction hash
export const getTxBlockNum = async (txHash: string) => {
    const req = await fetch("https://thrumming-wiser-wind.ethereum-goerli.discover.quiknode.pro/c04504dec720c90cd6d6f952254cccbe44923a62/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": 0,
            "method": "eth_getTransactionByHash",
            "params": [
                txHash
            ],
            "jsonrpc": "2.0"
        }),
    })

    const data: any = await req.json()
    return parseInt(data.result.blockNumber, 16)
}


// Getting the current block number to compare with the blocknumber that a ERC20 contract has deployed
export const getCurrentBlockNum = async () => {
    const req = await fetch("https://thrumming-wiser-wind.ethereum-goerli.discover.quiknode.pro/c04504dec720c90cd6d6f952254cccbe44923a62/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "method": "eth_blockNumber",
            "params": [],
            "jsonrpc": "2.0"
        }),
        redirect: 'follow'
    })


    const data: any = await req.json()
    return parseInt(data.result, 16)
}

export const ethGetProof = async (address: string, slots: string[], blockNumber: number) => {
    const req = await fetch("https://thrumming-wiser-wind.ethereum-goerli.discover.quiknode.pro/c04504dec720c90cd6d6f952254cccbe44923a62/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "method": "eth_getProof",
            "params": [
                address,
                slots,
                `0x${blockNumber.toString(16)}`
            ],
            "jsonrpc": "2.0",
            "id": 0
        })
    })

    const data: any = await req.json()
    return data.result
}

export const ethGetStorageAt = async (address: string, slot: string, blockNumber: number) => {
    const req = await fetch("https://thrumming-wiser-wind.ethereum-goerli.discover.quiknode.pro/c04504dec720c90cd6d6f952254cccbe44923a62/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "method": "eth_getStorageAt",
            "params": [
                address,
                slot,
                `0x${blockNumber.toString(16)}`
            ],
            "jsonrpc": "2.0",
            "id": 0
        })
    })

    const data: any = await req.json()
    return data.result
}



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

export const proofOfOwnershipL1PoolingBalance = async (l1_pooling_address: string, mapping_storage_slot: number) => {
    const balance_slot_keccak = ethers.utils.keccak256(
        ethers.utils.concat([
            ethers.utils.defaultAbiCoder.encode(
                ['uint256'],
                [mapping_storage_slot]
            ),
            ethers.utils.defaultAbiCoder.encode(
                ['address'],
                [l1_pooling_address]
            )
        ])
    )
    return { slot: balance_slot_keccak }
}




export const herodotusProof = async (address: string, blockNum: number) => {
    const herodotus_endpoint = process.env.HERODOTUS_API as string
    const herodotus_api_key = process.env.HERODOTUS_API_KEY as string
    const body = {
        originChain: "GOERLI",
        destinationChain: "STARKNET_GOERLI",
        blockNumber: blockNum,
        type: "ACCOUNT_ACCESS",
        requestedProperties: {
            ACCOUNT_ACCESS: {
                account: address,
                properties: [
                    "storageHash"
                ]
            }
        },
    }

    const response = await fetch("https://api.herodotus.cloud/" + '?apiKey=' + "00871c08-1a38-49e6-ad50-0755d756b247", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}


export const herodotusProofStatus = async (taskId: string) => {
    const response = await fetch("https://api.herodotus.cloud/status/" + `${taskId}` + '?apiKey=' + "00871c08-1a38-49e6-ad50-0755d756b247", {
        method: "GET",
    });
    const data = await response.json();
    return data;
}


export const starknetVerify = async (address: string, slot: string, blockNum: number) => {
    const ethProof = await ethGetProof(address, [slot], blockNum)
    const rawProof = ethProof.storageProof[0].proof;
    const proof = rawProof.map((leaf: any) => Data.fromHex(leaf).toInts());

    const flatProofByteLengths: number[] = [];
    const flatProofWordLengths: number[] = [];
    let flatProofValues: BigNumber[] = [];

    for (const element of proof) {
        flatProofByteLengths.push(element.sizeBytes);
        flatProofWordLengths.push(element.values.length);
        flatProofValues = flatProofValues.concat(element.values);
    }

    const slot_from_hex = Data.fromHex(slot)
        .toInts()
        .values.map((value: any) => value.toHexString())

    const output = {
        slot: slot_from_hex, proof_sizes_bytes: flatProofByteLengths.map((length) => "0x" + length.toString(16)), proof_sizes_words: flatProofWordLengths.map((length) => "0x" + length.toString(16)), proofs_concat: flatProofValues.map((value) => value.toHexString()),
    }

    return output
}