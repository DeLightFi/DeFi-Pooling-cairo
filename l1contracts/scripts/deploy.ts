import { ethers } from "hardhat";
import { ethGetStorageAt, proofOfOwnership } from "./get_storage_slot";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  // const lock = await ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });

  const limitDeposit = ethers.parseEther("1000");
  const depositInit = ethers.parseEther("0.005");


  const VAULT = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
  const W_ETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
  const GOV = "0xf37C169A537873425b010A03751F824E02271710"
  const REW = "0xf37C169A537873425b010A03751F824E02271710"


  // const vault = await ethers.deployContract("yearn", []);
  // await vault.initialize("0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6", GOV, REW, "", "")
  // await vault.setDepositLimit(limitDeposit)

  // const weth_contract = await ethers.getContractAt("ERC20", W_ETH);
  const vault = await ethers.getContractAt("yearn", VAULT);

  // const balance = await weth_contract.balanceOf(GOV)
  // console.log(balance)


  // await weth_contract.approve(VAULT, balance)
  // const shares = await vault.deposit()

  // console.log("deposit succes, issues shares:")
  // console.log(shares)


  const user_shares = await vault.balanceOf(GOV)
  console.log(user_shares)



  const proof = await proofOfOwnership(GOV, 7)
  const blockNumber = await ethers.provider.getBlockNumber()
  const value = await ethGetStorageAt(VAULT, proof.slot, blockNumber)

  console.log(value)

  // const value1 = await ethers.provider.getStorage(VAULT, 1)
  // console.log(value1)

  // const value2 = await ethers.provider.getStorage(VAULT, 2)
  // console.log(value2)

  // const value3 = await ethers.provider.getStorage(VAULT, 3)
  // console.log(value3)

  // const value4 = await ethers.provider.getStorage(VAULT, 4)
  // console.log(value4)
  // console.log(
  //   `Yearn vault deployed to ${vault.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
