// SPDX-License-Identifier: MIT

pragma solidity =0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ERC20Tool {
    using SafeERC20 for IERC20;

    function batchTransfer(address token, address[] calldata users, uint256[] calldata amts) external {
        for (uint256 i = 0; i < users.length; i++) {
            IERC20(token).safeTransferFrom(msg.sender, users[i], amts[i]);
        }
    }

    function batchQuery(address token, address[] calldata accounts) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](accounts.length);
        for (uint i = 0; i < accounts.length; i++) {
            balances[i] = IERC20(token).balanceOf(accounts[i]);
        }
        return balances;
    }

    function batchQuery2(address account, address[] calldata tokens) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](tokens.length);
        for (uint i = 0; i < tokens.length; i++) {
            balances[i] = IERC20(tokens[i]).balanceOf(account);
        }
        return balances;
    }
}
