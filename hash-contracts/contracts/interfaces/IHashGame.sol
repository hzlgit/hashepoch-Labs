// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

interface IHashGame {
    function initialize(address, address, address[] calldata, address[] calldata, uint256[] calldata) external;
    function manager() external returns (address);
    function guarantee() external returns (address);
    function settled(uint256) external returns (bool);
    function recover() external;

    function settle(uint256 issue, uint256[] calldata, uint256[] calldata) external;
}
