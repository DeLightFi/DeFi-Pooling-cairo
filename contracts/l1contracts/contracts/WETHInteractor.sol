// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IWETH {
    function deposit() external payable;

    function withdraw(uint256 wad) external;
}

contract WETHInteractor {
    IWETH private weth;

    constructor(address _wethAddress) {
        weth = IWETH(_wethAddress);
    }

    receive() external payable {}

    fallback() external payable {}

    function deposit() external payable {
        weth.deposit{value: msg.value}();
    }

    function withdraw(uint256 amount) external {
        weth.withdraw(amount);
    }
}
