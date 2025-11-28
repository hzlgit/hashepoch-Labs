// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

interface IHashGuarantee {
    function initialize(address, address, address[] calldata) external;
    function manager() external returns (address);
    function setTokens(address [] calldata _tokens) external;
    function transfed(uint256) external returns (bool);
    function transfer(uint256 txId, uint8[] calldata, uint256[] calldata) external;
}
