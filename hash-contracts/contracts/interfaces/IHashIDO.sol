// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

interface IHashIDO {
    function contribute(uint256 orderNo, address user, uint256 usdtAmount, bool whiteUser) external returns (uint256);
    function refundToken(address token) external;
}
