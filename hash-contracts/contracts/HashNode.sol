// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import "@openzeppelin/contracts/access/Ownable.sol";

contract HashNode is Ownable {
    using SafeERC20 for IERC20;

    address public manager;

    address public collection;

    mapping(uint256 => uint256) public sold;
    mapping(uint256 => uint256) public maxNode;

    mapping(uint256 => bool) public purchaseOrder;
    mapping(uint256 => bool) public claimOrder;

    event Purchase(
        uint256 indexed orderId,
        address indexed user,
        address token,
        uint256 amount,
        uint8 nodeType,
        uint256 count,
        uint256 time
    );
    event Claim(uint256 indexed orderId, address indexed user, address token, uint256 amount, uint256 time);

    constructor(address _manager, address _collection, uint256 _maxNode1, uint256 _maxNode2) Ownable(msg.sender){
        manager = _manager;
        collection = _collection;
        maxNode[1] = _maxNode1;
        maxNode[2] = _maxNode2;
        sold[1] = 400;
        sold[2] = 0;
    }

    function purchase(
        uint256 orderId,
        address token,
        uint256 amount,
        uint8 nodeType,
        uint256 nodeCount,
        address user,
        uint256 deadline,
        bytes memory signature
    ) public {
        require(msg.sender == user, 'Account error');
        checkSign(orderId, token, amount, user, deadline, signature);

        require(!purchaseOrder[orderId], 'Order exist');
        require(nodeCount < maxNode[nodeType] - sold[nodeType], 'Sold out');

        purchaseOrder[orderId] = true;
        sold[nodeType] += nodeCount;

        uint256 target = (amount * 15) / 100;

        IERC20(token).safeTransferFrom(msg.sender, address(this), target);

        IERC20(token).safeTransferFrom(msg.sender, collection, amount - target);

        emit Purchase(orderId, msg.sender, token, amount, nodeType, nodeCount, block.timestamp);
    }

    function claim(
        uint256 orderId,
        address token,
        uint256 amount,
        address user,
        uint256 deadline,
        bytes memory signature
    ) public {
        require(msg.sender == user, 'Account error');
        checkSign(orderId, token, amount, user, deadline, signature);

        require(!claimOrder[orderId], 'Order exist');

        claimOrder[orderId] = true;

        IERC20(token).transfer(msg.sender, amount);

        emit Claim(orderId, msg.sender, token, amount, block.timestamp);
    }

    function checkSign(
        uint256 orderId,
        address token,
        uint256 amount,
        address user,
        uint256 deadline,
        bytes memory signature
    ) public view {
        require(block.timestamp < deadline, 'Out of dead');

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
                '\x19Ethereum Signed Message:\n32',
                keccak256(abi.encode(getChainId(), orderId, token, amount, user, deadline))
            )
        );

        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == manager, 'Space: INVALID_SIGNATURE');
    }

    function getChainId() public view returns (uint256) {
        return block.chainid;
    }

    function setCollection(address _collection) public onlyOwner {
        collection = _collection;
    }

    function setNodevVolume(uint256 _nodeType, uint256 _max) public onlyOwner {
        maxNode[_nodeType] = _max;
    }

    function withdrawAssets(address token, address to, uint256 amount) public onlyOwner {
        if (address(0) == token) {
            payable(to).transfer(amount);
        } else {
            IERC20(token).transfer(to, amount);
        }
    }
}
