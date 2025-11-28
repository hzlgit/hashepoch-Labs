// SPDX-License-Identifier: MIT

pragma solidity =0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HestConfig1 is Ownable {
    uint256 private buyFee;
    uint256 private sellFee;
    bool private locked;
    address HEST;
    uint8 firstBlackCount = 10;

    mapping(address => bool) private whites;
    mapping(address => bool) private blacks;

    error UnauthorizedAccount(address account);
    constructor() Ownable(msg.sender) {}

    function setWhites(address[] calldata white, bool _isWhite) public onlyOwner {
        for (uint256 i = 0; i < white.length; ++i) {
            whites[white[i]] = _isWhite;
        }
    }

    function setBlacks(address[] calldata blacks_, bool _isBlack) public onlyOwner {
        for (uint256 i = 0; i < blacks_.length; ++i) {
            blacks[blacks_[i]] = _isBlack;
        }
    }

    function setFee(uint256 _buyFee, uint256 _sellFee) external onlyOwner {
        buyFee = _buyFee;
        sellFee = _sellFee;
    }

    function setLocked(bool _isLock) external onlyOwner {
        locked = _isLock;
    }

    function setHEST(address _hest) external onlyOwner {
        HEST = _hest;
    }

    function setFirstCount(uint8 _max) external onlyOwner {
        firstBlackCount = _max;
    }

    function checkAndSetFirstBlack(address _user) external {
        if (msg.sender != HEST) {
            revert UnauthorizedAccount(msg.sender);
        }
        if (firstBlackCount > 0) {
            firstBlackCount -= 1;
            blacks[_user] = true;
        }
    }

    function getFee() public view returns (uint256, uint256) {
        return (buyFee, sellFee);
    }

    function blackOf(address _user) public view returns (bool) {
        return blacks[_user];
    }

    function whiteOf(address _user) public view returns (bool) {
        return whites[_user];
    }

    function isLock() public view returns (bool) {
        return locked;
    }
}
