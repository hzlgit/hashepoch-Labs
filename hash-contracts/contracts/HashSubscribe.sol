// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HashSubscribe is Ownable, ReentrancyGuard {
    IERC20 public usdt;

    address public vaulat;
    address public constant RECEIVE = 0xbdDB8625e806A13d41FCb3F82d69B4D19048ada3;

    modifier onlyVaulat() {
        if (vaulat != _msgSender()) {
            revert VaulatUnauthorizedAccount(_msgSender());
        }
        _;
    }

    event Subscribe(address indexed contributor, uint256 orderNo, uint256 amount, uint256 time);

    error VaulatUnauthorizedAccount(address);

    constructor(address _usdt, address _vaulat) Ownable(msg.sender) {
        usdt = IERC20(_usdt);
        vaulat = _vaulat;
    }

    function contribute(
        uint256 orderNo,
        address user,
        uint256 usdtAmount,
        bool whiteUser
    ) external onlyVaulat returns (uint256) {
        usdt.transfer(RECEIVE, usdtAmount);
        emit Subscribe(user, orderNo, usdtAmount, block.timestamp);
        return 0;
    }

    function refundToken(address token) external onlyOwner {
        IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }
}
