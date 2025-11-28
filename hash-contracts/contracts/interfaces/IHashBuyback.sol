// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

interface IHashBuyback {
    function buyBack(address token, uint256 orderId) external;
}
