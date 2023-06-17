// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
}

interface IBridge {
    function deposit(uint256 amount, uint256 l2Recipient) external payable;
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
    address public starkgateBridge;
    uint256 public receivedEthBalance;
    uint256 public bridgedOutEthBalance;
    IWETH private weth;
    address public vault;
    address public admin;

    event Deposit(address indexed sender, uint256 value);
    event WithdrawAndBridge(uint256 indexed l2Recipient, uint256 value);

    constructor(
        uint256 _l2Address,
        address _starkgateBridge,
        address _wrappedEth,
        address _vault
    ) {
        l2Address = _l2Address;
        starkgateBridge = _starkgateBridge;
        weth = IWETH(_wrappedEth);
        vault = _vault;
        admin = msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function handleDeposit() external onlyOwner {
        // Deposit the maximum balance of ETH in the WETH contract and deposit to yearn vault
        uint256 maxBalance = address(this).balance;
        if (maxBalance > 0) {
            receivedEthBalance += maxBalance;
            weth.deposit{value: maxBalance}();
            weth.approve(vault, maxBalance);
            IVault(vault).deposit(maxBalance, address(this));
            emit Deposit(msg.sender, maxBalance);
        }
    }

    function handleWithdraw(uint256 amount) external payable onlyOwner {
        uint256 value = IVault(vault).withdraw(amount, address(this), 1);
        weth.withdraw(value);
        bridgedOutEthBalance += value;
        require(msg.value > 0, "No fees Provided");

        IBridge(starkgateBridge).deposit{value: value + msg.value}(
            value,
            l2Address
        );
        emit WithdrawAndBridge(l2Address, value);
    }

    function updateBridgeAddress(
        address _new_bridge_address
    ) external onlyOwner {
        starkgateBridge = _new_bridge_address;
    }

    function updateL2Address(uint256 _l2Address) external onlyOwner {
        l2Address = _l2Address;
    }

    function updateVaultAddress(address _vault) external onlyOwner {
        vault = _vault;
    }
}
