import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0x4631AF31a0e72f04ea9dE0CBdB45C7C2cf013679"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);
    const VAULT = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
    const GOV = "0xf37C169A537873425b010A03751F824E02271710"


    const proof = await proofOfOwnership(GOV, 7)
    const blockNumber = await ethers.provider.getBlockNumber()
    const value = await ethGetStorageAt(VAULT, proof.slot, blockNumber)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
