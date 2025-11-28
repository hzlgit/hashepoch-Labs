// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract HashStake is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public vaulat;
    mapping(uint256 => bool) public stakeOrderId;
    address public manager;

    event Staked(address indexed user, address token, uint256 orderId, uint256 amount, uint256 time);

    constructor(address _vaulat, address _manager) Ownable(msg.sender) {
        vaulat = _vaulat;
        manager = _manager;
    }

    function stake(
        uint256 orderId,
        address token,
        address user,
        uint256 amt,
        uint256 deadline,
        bytes memory signature
    ) external {
        checkSign(orderId, user, token, amt, deadline, signature);
        require(!stakeOrderId[orderId], "Order exist");

        stakeOrderId[orderId] = true;
        IERC20(token).safeTransferFrom(msg.sender, vaulat, amt);
        emit Staked(user, token, orderId, amt, block.timestamp);
    }

    function refundToken(address token) external onlyOwner {
        IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }
    function setManager(address _manager) external onlyOwner {
        manager = _manager;
    }

    function getChainId() public view returns (uint256) {
        return block.chainid;
    }

    function checkSign(
        uint256 orderId,
        address user,
        address token,
        uint256 amount,
        uint256 deadline,
        bytes memory signature
    ) internal view {
        require(block.timestamp < deadline, "Out of dead");

        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encode(getChainId(), orderId, user, token, amount, deadline))
            )
        );

        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == manager, "INVALID_SIGNATURE");
    }
}
