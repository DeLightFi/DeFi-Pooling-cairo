import subprocess
import json


def run_command(cmd):
    subprocess.run(cmd, shell=True, check=True)


pooling_l2 = "0x048ee4b75b5dda9d250fb44e0f4a4d5360d9cee818e7018a0bad4923b1eb5526"
pooling_l1 = "0x611f68dCBA8F9Cc049669ee75Eac7cc1b53FfE77"
funcion = "update_l1_pooling"

print("update_l1_pooling")
update_l1_pooling = f"protostar invoke --contract-address {pooling_l2} --function {funcion} --network testnet --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81 --max-fee auto --private-key-path ./pk --inputs {pooling_l1}"
out = run_command(update_l1_pooling)
