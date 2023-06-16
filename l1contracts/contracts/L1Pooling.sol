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
    function deposit(uint256 l2Recipient) external payable;
}

interface IWETH {
    function deposit() external payable;

    function withdraw(uint wad) external;

    function approve(address spender, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
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
    uint256 public valueOutFromVault;
    uint256 public truWETHBalance;

    address public wrappedEth;
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
        wrappedEth = _wrappedEth;
        vault = _vault;
        admin = msg.sender;
    }

    receive() external payable {
        require(msg.value > 0, "No value sent");
        if (msg.sender == starkgateBridge || msg.sender == owner) {
            receivedEthBalance += msg.value;
            handleDeposit();
        } else {
            payable(msg.sender).transfer(msg.value);
        }
    }

    function handleDeposit() internal {
        // Deposit the maximum balance of ETH in the WETH contract
        uint256 maxBalance = address(this).balance;
        IWETH(wrappedEth).deposit{value: maxBalance}();
        IWETH(wrappedEth).approve(vault, maxBalance);
        IVault(vault).deposit(maxBalance, address(this));
        emit Deposit(msg.sender, maxBalance);
    }

    function handleWithdraw(uint256 amount) external onlyOwner {
        uint256 value = IVault(vault).withdraw(amount, address(this), 1);
        IWETH(wrappedEth).withdraw(value);
        bridgedOutEthBalance += value;
        IBridge(starkgateBridge).deposit{value: value}(l2Address);
        emit WithdrawAndBridge(l2Address, value);
    }

    function handleWithdraw1(uint256 amount) external onlyOwner {
        uint256 value = IVault(vault).withdraw(amount, address(this), 1);
        valueOutFromVault = value;
        truWETHBalance = IWETH(wrappedEth).balanceOf(address(this));
    }

    function handleWithdraw2(uint256 amount) external onlyOwner {
        uint256 previous_WETHBalance = IWETH(wrappedEth).balanceOf(
            address(this)
        );
        uint256 value = IVault(vault).withdraw(amount, address(this), 1);
        uint256 new_WETHBalance = IWETH(wrappedEth).balanceOf(address(this));
        uint256 outFromVault = new_WETHBalance - previous_WETHBalance;
        IWETH(wrappedEth).withdraw(outFromVault);
    }

    function handleWithdrawWETH1(uint amount) external onlyOwner {
        IWETH(wrappedEth).withdraw(amount);
    }

    function handleWithdrawWETH2(uint amount) external onlyOwner {
        IWETH(wrappedEth).withdraw(amount);
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
