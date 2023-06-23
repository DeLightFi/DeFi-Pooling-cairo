import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0x4559035A77Cfbbcc1af18c47118e90A89D7C1673"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);


    const amount = ethers.parseEther('0.02');
    const [signer] = await ethers.getSigners()
    const transaction = await signer.sendTransaction({
        to: l1Pooling.target,
        value: amount,
    });

    await l1Pooling.handleDeposit()
    console.log("deposited")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
