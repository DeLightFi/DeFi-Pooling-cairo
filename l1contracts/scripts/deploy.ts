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
  const withdrawInit = ethers.parseEther("0.0005");


  const POOLING = "0x5e7765a504c3540f822204a51eee1ce7072be868"

  const VAULT = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
  const W_ETH = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
  const GOV = "0xf37C169A537873425b010A03751F824E02271710"
  const REW = "0xf37C169A537873425b010A03751F824E02271710"
  const L2_ADDRESS = 2060088207644560307163264442939760438175400558465768933647742133580491456385n
  const STARKGATE_BRIDGE = "0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e"



  // const l1Pooling = await ethers.deployContract("L1Pooling", [L2_ADDRESS, STARKGATE_BRIDGE, W_ETH, VAULT]);
  // const vault = await ethers.deployContract("yearn", []);
  // await vault.initialize("0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6", GOV, REW, "", "")
  // await vault.setDepositLimit(limitDeposit)


  const weth_contract = await ethers.getContractAt("IWETH", W_ETH);
  // const vault = await ethers.getContractAt("yearn", VAULT);
  const l1Pooling = await ethers.getContractAt("L1Pooling", POOLING);

  // await weth_contract.approve(VAULT, BigInt(10000000000000000000n))
  // console.log("approved")
  // await vault.deposit()
  // console.log("deposited")

  // await vault.withdraw()


  // const balance = await weth_contract.balanceOf(GOV)
  // console.log(balance )
  // const to_Deposit =   BigInt(10000000000000000)

  // Specify the amount to transfer (in wei)
  // const amount = ethers.parseEther('0.01');

  // const amount1 = await l1Pooling.valueOutFromVault();
  // const amount2 = await l1Pooling.truWETHBalance();
  // console.log(amount1)
  // console.log(amount2)

  // Transfer ETH to the recipient address
  // const [signer] = await ethers.getSigners()
  // const transaction = await signer.sendTransaction({
  //   to: l1Pooling.target,
  //   value: amount,
  // });

  // console.log(l1Pooling.target)

  // console.log(l1Pooling.target)

  const amount_withdraw = ethers.parseEther('0.005');

  // const tx = await l1Pooling.handleWithdrawWETH1(amount_withdraw);

  await weth_contract.withdraw(amount_withdraw)
  console.log("success")

  // await weth_contract.transfer(POOLING, BigInt(10000000000000000))
  // const shares = await vault.deposit()

  // const result = await vault.withdraw(); // No arguments provided, will use default values
  // console.log(result)
  // console.log("deposit succes, issues shares:")
  // console.log(shares)

  // const pooling_shares = await vault.balanceOf(POOLING)
  // console.log(pooling_shares)


  // const amount_withdraw = ethers.parseEther('0.0001');
  // await l1Pooling.handleWithdrawWETH2(amount_withdraw);

  // try {
  //   const tx = await l1Pooling.handleWithdraw(amount_withdraw);
  //   await tx.wait();
  // } catch (error) {
  //   console.error("Error message:", error);
  // }

  // await weth_contract.transferFrom(GOV, VAULT, limitDeposit)

  // const proof = await proofOfOwnership(GOV, 7)
  // const blockNumber = await ethers.provider.getBlockNumber()
  // const value = await ethGetStorageAt(VAULT, proof.slot, blockNumber)


  // console.log(value)

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
