import subprocess
import json


def run_command(cmd):
    subprocess.run(cmd, shell=True, check=True)


l2vault = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"

print("DECLARE")
declare_cmd = "protostar declare Defipooling --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81 --max-fee 1000000000 --network testnet --private-key-path ./pk "
run_command(declare_cmd)
# print("DEPLOY")
# deploy_cmd = "protostar deploy 0x011571794ebc7627099ae5f02752c0fcfe1e7a24d7a30daabc9d3d375afdab25 --max-fee 100000000000000000 --network testnet --private-key-path ./pk --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81 --inputs 0x4559035A77Cfbbcc1af18c47118e90A89D7C1673 39 32 23 99 0x07c88f02f0757b25547af4d946445f92dbe3416116d46d7b2bd88bcfad65a06f"
# out = run_command(deploy_cmd)
# print("Sending proof")
# out = run_command(
#     f"./protostar call --contract-address {l2vault} --function call_hero --json")


# proof_cmd = "protostar call 0x011571794ebc7627099ae5f02752c0fcfe1e7a24d7a30daabc9d3d375afdab25 --max-fee 100000000000000000 --network testnet --private-key-path ./pk --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81"
