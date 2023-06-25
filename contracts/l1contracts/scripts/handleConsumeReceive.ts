import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0xb273c84Af2C533934b5eBcaCE450427c30059dB6"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);

    const L2_ADDRESS = await l1Pooling.l2Address
    console.log(L2_ADDRESS)

    await l1Pooling.handleConsumeReceive("900000000000000")
    console.log(`message consumed, received  ETH`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
