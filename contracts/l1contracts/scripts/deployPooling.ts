import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const VAULT = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
    const W_ETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
    const L2_ADDRESS = "2812218580446214580912664467311047664712800122890981938811790542891292513205"
    const STARKGATE_BRIDGE = "0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e"
    const STARKNET_CORE = "0xde29d060D45901Fb19ED6C6e959EB22d8626708e"

    const l1Pooling = await ethers.deployContract("L1Pooling", [L2_ADDRESS, STARKGATE_BRIDGE, W_ETH, VAULT, STARKNET_CORE]);
    console.log(l1Pooling.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

