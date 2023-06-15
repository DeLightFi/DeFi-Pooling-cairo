import { ethers } from "ethers";

const quicknode_endpoint = process.env.QUICKNODE_API as string


export const proofOfOwnership = async (user_address: string, mapping_storage_slot: number) => {
    const Encorder = new ethers.AbiCoder()
    const balance_slot_keccak = ethers.keccak256(
        ethers.concat([
            Encorder.encode(
                ['address'],
                [user_address]
            ),
            Encorder.encode(
                ['uint256'],
                [mapping_storage_slot]
            )
        ])
    )
    return { slot: balance_slot_keccak }
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

    return (await req.json())
}
