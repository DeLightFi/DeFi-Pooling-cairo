import subprocess
import json


def run_command(cmd):
    subprocess.run(cmd, shell=True, check=True)


print("DECLARE")
declare_cmd = "protostar declare Defipooling --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81 --max-fee 2261000017654 --network testnet --private-key-path ./pk "
run_command(declare_cmd)
