# POC: L1 yields strategies available on Starknet

## Context 

Joining, leaving, and re-balancing a L1 Pool is expensive, often prohibitively so. Layer 2 (L2) transaction pooling and matching enables sharing the transaction costs across a larger group. It has taken years and years to build a resilient DeFi ecosystem on Ethereum, with deep liquidity and more complex strategies. 
This POC aims to provide an innovative solution in this transitioning phase while we have most of the liquidity and usability still on L1. 

DeFi pooling provides asynchronous withdrawals and processes transactions periodically (for example, daily). If the volume of these operations is significant, it can result in substantial gas costs, even if it is less than executing each operation individually on L1.
In a perfect scenario, if liquidity could be efficiently spread between L1 and L2, with L2 handling the majority of smaller and frequent transactions, and L1 being used for larger, less frequent transactions, it could strike a balance that maximizes both scalability and capital efficiency while minimizing gas costs.

# POC: L1 yields strategies available on Starknet

Introducing Starknet vaults representing L1 strategies with instant deposit & redeem, managing dynamically capital rebalancing and governance free. 
The liquidity is spread between L1 and L2 following deposit/redeem demand, the capital can be moved if the L2 or L1 allocation reaches a certain threshold, can be executed by anyone. 

The efficiency of the "copied" L1 strategy is related to the ETH L1 allocation as it is the only one to generate yields.
- When deposit volume increases from L2, the L1 allocation decreases leading in decreasing APY and as a consequence less deposit.
- When deposit volume decreases from L2, the L1 allocation increases leading in increasing APY and as a consequence more deposit.

This is made possible because the vault interacts with the Herodotus contract registry to query ETH reserve outside of the vault: transiting to L1, allocated in strategies, transiting to l2. 
The vault always checks if the proof is not stale (short delay) before allowing any interactions.

Then all matching can be realized on L2 magic. 
It is super gas efficient and there are even optimal scenarios where the yields increasing L1 reserve is compensated by increasing L2 reserve by bigger deposit demand -> the L1 is not doing anything

![Image 1](url-to-your-image1)

# Implementation

![Image 2](url-to-your-image2)

# Proof

Get value, L2 calldata and task id from herodotus (to prove l1 states for current block)

curl -X POST http://localhost:3000/api/herodotus \
  -H "Content-Type: application/json" 

Get Task status

curl -X GET "http://localhost:3000/api/herodotus?taskId=<53aafb2f-6901-40fd-a47e-add76f204683>"
replace with the desired taskId