import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
    const POOLING = "0xb273c84Af2C533934b5eBcaCE450427c30059dB6"
    const L2_ADDRESS = "2077327618937967816086762692994289674902587372023543661804227704443616633696"
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
