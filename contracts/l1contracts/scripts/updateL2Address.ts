import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0x611f68dCBA8F9Cc049669ee75Eac7cc1b53FfE77"
    const L2_ADDRESS = "3301998585152245325029299062694345304378374425727516902128828494767869819286"
    const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);


    await l1Pooling.updateL2Address(L2_ADDRESS)
    console.log(`L2 address updated`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
