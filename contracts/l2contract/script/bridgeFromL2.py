import subprocess
import json


def run_command(cmd):
    subprocess.run(cmd, shell=True, check=True)


pooling_l2 = "0x048ee4b75b5dda9d250fb44e0f4a4d5360d9cee818e7018a0bad4923b1eb5526"
funcion = "handle_bridge_from_l2"

print("BRIDGE FROM L2")
brdige_from_l2 = f"protostar invoke --contract-address {pooling_l2} --function {funcion} --network testnet --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81 --max-fee auto --private-key-path ./pk"
out = run_command(brdige_from_l2)
