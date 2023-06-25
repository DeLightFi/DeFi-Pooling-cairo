import subprocess
import json


def run_command(cmd):
    subprocess.run(cmd, shell=True, check=True)


owner = "0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81"
l2vault = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
pooling_hash = "0x0436ac4693f5e867fe232a259dd95eb74738baee33cdbf33b714f2e6da30e3f7"
eth = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
name = "0x049"
symbol = "0x03"
bridge = "0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82"
fact_registery = "0x07c88f02f0757b25547af4d946445f92dbe3416116d46d7b2bd88bcfad65a06f"
pragma = "0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4"
yearn_vault = "0x080C23F201E014FEda37D2Abb2ad11a65cbBf109"
yearn_token_balance_slot = "0x72756281b0830a22 0x170eb9a5320a4b30 0xae3b228918eb21d4 0x9ecad87ad662b3a1"
pooling_bridged_underlying_slot = "0x00 0x00 0x00 0x04"
pooling_received_underlying_slot = "0x00 0x00 0x00 0x03"
ideal_l2_underlying_ratio = "100000000000000000 0"
rebalancing_threshold = "500000000000000000 0"
data_provider_fee_share = "800000000000000000 0"
l2_bridger_fee_share = "100000000000000000 0"
l1_bridger_fee_share = "100000000000000000 0"


print("DEPLOY")
deploy_cmd = f"protostar deploy {pooling_hash} --max-fee 36450000396750 --network testnet --private-key-path ./pk --account-address 0x048df7F681Ee077C3F64eF4E5D8b4f3CCBE5A9Fb57f381b05588aF6b8Bf0fF81 --inputs {owner} {name} {symbol} {eth} {bridge} {fact_registery} {pragma} {yearn_vault} {yearn_token_balance_slot} {pooling_bridged_underlying_slot} {pooling_received_underlying_slot} {ideal_l2_underlying_ratio} {rebalancing_threshold} {data_provider_fee_share} {l2_bridger_fee_share} {l1_bridger_fee_share} "
out = run_command(deploy_cmd)
