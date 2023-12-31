import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0xb273c84Af2C533934b5eBcaCE450427c30059dB6"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);
    const VAULT = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
    const GOV = "0xf37C169A537873425b010A03751F824E02271710"


    // YEARN STORAGE 
    //  "balanceOf": {"type": "HashMap[address, uint256]", "slot": 7},   -> balance of yeanr token for l1Pooling 

// We also need to calculate the value in ETH of  the yearnVault token, 

    // YEARN STORAGE 
    │// L1Pooling │  receivedEthBalance  │      3       │   0    │      t_uint256      │  0  │ /build-info/2c9591f980c21ec7abc243cffeed83c6.json │      32       │
    │// L1Pooling │ bridgedOutEthBalance │      4       │   0    │      t_uint256      │  0  │ /build-info/2c9591f980c21ec7abc243cffeed83c6.json │      32 

    // --storage-layout-file 
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
