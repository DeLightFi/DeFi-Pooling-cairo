import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0x4559035A77Cfbbcc1af18c47118e90A89D7C1673"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);

    const receivedEthBalance = await l1Pooling.receivedEthBalance()
    const bridgedOutEthBalance = await l1Pooling.bridgedOutEthBalance()
    console.log(receivedEthBalance)
    console.log(bridgedOutEthBalance)

    // uint256 public receivedEthBalance;
    // uint256 public bridgedOutEthBalance;

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
