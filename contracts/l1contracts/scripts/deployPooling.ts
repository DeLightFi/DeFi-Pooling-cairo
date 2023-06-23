import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const VAULT = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
    const W_ETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
    const L2_ADDRESS = 2060088207644560307163264442939760438175400558465768933647742133580491456385n
    const STARKGATE_BRIDGE = "0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e"

    const l1Pooling = await ethers.deployContract("L1Pooling", [L2_ADDRESS, STARKGATE_BRIDGE, W_ETH, VAULT]);
    console.log(l1Pooling.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
