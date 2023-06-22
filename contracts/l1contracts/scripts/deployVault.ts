import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
  const limitDeposit = ethers.parseEther("1000");
  const W_ETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
  const GOV = "0xf37C169A537873425b010A03751F824E02271710"
  const REW = "0xf37C169A537873425b010A03751F824E02271710"

  const vault = await ethers.deployContract("yearn", []);
  await vault.initialize(W_ETH, GOV, REW, "", "")
  await vault.setDepositLimit(limitDeposit)
  console.log(vault.target)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
