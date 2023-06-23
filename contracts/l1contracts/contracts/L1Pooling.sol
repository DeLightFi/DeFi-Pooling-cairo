// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStarknetCore {
    function sendMessageToL2(
        uint256 toAddress,
        uint256 selector,
        uint256[] calldata payload
    ) external payable returns (bytes32, uint256);

    function consumeMessageFromL2(
        uint256 fromAddress,
        uint256[] calldata payload
    ) external returns (bytes32);

    function l2ToL1Messages(bytes32 msgHash) external view returns (uint256);
}

interface IVault {
    function deposit(
        uint256 amount,
        address recipient
    ) external returns (uint256);

    function withdraw(
        uint256 maxShares,
        address recipient,
        uint256 maxLoss
    ) external returns (uint256);

    function _sharesForAmount(uint256 amount) external view returns (uint256);
}

interface IBridge {
    function deposit(uint256 amount, uint256 l2Recipient) external payable;

    function withdraw(uint256 amount) external;
}

interface IWETH {
    function deposit() external payable;

    function approve(address guy, uint wad) external returns (bool);

    function withdraw(uint256 wad) external;
}

contract Ownable {
    address public owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract L1Pooling is Ownable {
    uint256 public l2Address;
    uint256 public l2AddressOwner;
    IBridge public starkgateBridge;
    uint256 public receivedEthBalance;
    uint256 public bridgedOutEthBalance;
    IWETH private weth;
    IVault public vault;
    address public admin;
    IStarknetCore private starknetCore;

    event WithdrawBridgeDepositYield(uint256 amount);
    event WithdrawYieldDepositBridge(uint256 amount);

    constructor(
        uint256 _l2Address,
        address _starkgateBridge,
        address _wrappedEth,
        address _vault,
        address _starkgateCore,
        uint256 _l2AddressOwner
    ) {
        l2Address = _l2Address;
        starkgateBridge = IBridge(_starkgateBridge);
        weth = IWETH(_wrappedEth);
        vault = IVault(_vault);
        admin = msg.sender;
        starknetCore = IStarknetCore(_starkgateCore);
        l2AddressOwner = _l2AddressOwner;
    }

    receive() external payable {}

    fallback() external payable {}

    // function handleDeposit() external onlyOwner {
    //     // Deposit the maximum balance of ETH in the WETH contract and deposit to yearn vault
    //     uint256 maxBalance = address(this).balance;
    //     if (maxBalance > 0) {
    //         receivedEthBalance += maxBalance;
    //         weth.deposit{value: maxBalance}();
    //         weth.approve(vault, maxBalance);
    //         vault.deposit(maxBalance, address(this));
    //         emit Deposit(msg.sender, maxBalance);
    //     }
    // }

    // function handleWithdraw(uint256 amount) external payable onlyOwner {
    //     uint256 value = vault.withdraw(amount, address(this), 1);
    //     weth.withdraw(value);
    //     bridgedOutEthBalance += value;
    //     require(msg.value > 0, "No fees Provided");

    //     starkgateBridge.deposit{value: value + msg.value}(value, l2Address);
    //     emit WithdrawAndBridge(l2Address, value);
    // }

    function handleConsumeReceive(uint256 amount) external {
        uint256[] memory payload = new uint256[](3);
        payload[0] = 1;
        payload[1] = amount;
        payload[2] = 0;
        starknetCore.consumeMessageFromL2(l2Address, payload);
        starkgateBridge.withdraw(amount);
        receivedEthBalance += amount;
        weth.deposit{value: amount}();
        weth.approve(address(vault), amount);
        IVault(vault).deposit(amount, address(this));
        emit WithdrawBridgeDepositYield(amount);
    }

    function handleConsumeBridge(uint256 amount) external payable {
        require(msg.value > 0, "No fees Provided");
        uint256[] memory payload = new uint256[](3);
        payload[0] = 2;
        payload[1] = amount;
        payload[2] = 0;
        starknetCore.consumeMessageFromL2(l2Address, payload);
        uint256 shares_to_withdraw = vault._sharesForAmount(amount);
        uint256 value = IVault(vault).withdraw(
            shares_to_withdraw,
            address(this),
            1
        );
        weth.withdraw(value);
        bridgedOutEthBalance += value;
        starkgateBridge.deposit{value: value + msg.value}(
            value,
            l2AddressOwner
        );
        emit WithdrawYieldDepositBridge(amount);
    }

    function updateBridgeAddress(
        address _new_bridge_address
    ) external onlyOwner {
        starkgateBridge = IBridge(_new_bridge_address);
    }

    function updateL2Address(uint256 _l2Address) external onlyOwner {
        l2Address = _l2Address;
    }

    function updateVaultAddress(address _vault) external onlyOwner {
        vault = IVault(_vault);
    }
}
