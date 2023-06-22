import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0x4559035A77Cfbbcc1af18c47118e90A89D7C1673"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);

    const amount = ethers.parseEther('0.01');
    const feeValue = ethers.parseEther('0.001');




    await l1Pooling.handleWithdraw(amount, { value: feeValue })
    console.log("withdrawn")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
