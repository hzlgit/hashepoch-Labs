// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HashIDO is Ownable, ReentrancyGuard {
    IERC20 public usdt;
    IERC20 public hest;

    uint256[3] public stageRemaining;
    uint256 public currentStage = 0;
    bool public isActive = true;
    address public admin;
    address public vaulat;

    uint256 private constant PHASE1_TARGET = 420_000 * 1e18; // 450,000 USDT
    uint256 private constant PHASE2_TARGET = 540_000 * 1e18; // 540,000 USDT
    uint256 private constant PHASE3_TARGET = 752_500 * 1e18; // 752,500 USDT

    mapping(address => bool) public whiteOrders;
    mapping(address => uint256) public whitelist;

    address public constant RECEIVE = 0x5832c295Dab1a97d3a94239a088b33cBDb708e24;
    address public constant LEADER = 0xfdD6a4c044a918777ce5F1Db03a926a9e4599536;
    address public constant MARKET = 0xbAf1A39d8Bb32d2C51b77b2b4a26C14BE1f5725e;

    modifier onlyAdmin() {
        if (admin != _msgSender()) {
            revert AdminUnauthorizedAccount(_msgSender());
        }
        _;
    }
    modifier onlyVaulat() {
        if (vaulat != _msgSender()) {
            revert VaulatUnauthorizedAccount(_msgSender());
        }
        _;
    }

    event Contribution(
        address indexed contributor,
        uint256 orderNo,
        uint256 stageIndex,
        uint256 amount,
        bool isWhite,
        uint256 time
    );
    event StageAdvanced(uint256 newStageIndex);
    event FundingCompleted();
    event FundingStarted();
    error AdminUnauthorizedAccount(address);
    error VaulatUnauthorizedAccount(address);

    constructor(address _usdt, address _vaulat, address _admin) Ownable(msg.sender) {
        usdt = IERC20(_usdt);
        admin = _admin;
        vaulat = _vaulat;
        stageRemaining[0] = PHASE1_TARGET;
        stageRemaining[1] = PHASE2_TARGET;
        stageRemaining[2] = PHASE3_TARGET;
    }

    function contribute(
        uint256 orderNo,
        address user,
        uint256 usdtAmount,
        bool whiteUser
    ) external onlyVaulat returns (uint256) {
        if (whitelist[user] >= usdtAmount) {
            whitelist[user] -= usdtAmount;
            allocation(usdtAmount);
            emit Contribution(user, orderNo, 0, usdtAmount, whiteUser, block.timestamp);
            return 0;
        } else {
            require(isActive, "Funding not active");
            uint256 remainingPayment = usdtAmount;
            if (whiteUser) {
                require(!whiteOrders[user], "Whitelist Contributed");
                whiteOrders[user] = true;
                remainingPayment = 0;
                allocation(usdtAmount);
                emit Contribution(user, orderNo, 0, usdtAmount, whiteUser, block.timestamp);
            } else {
                while (remainingPayment > 0 && currentStage < 3) {
                    uint256 availableInStage = stageRemaining[currentStage];
                    if (availableInStage == 0) {
                        advanceStage();
                        continue;
                    }
                    uint256 contributeAmount = remainingPayment;
                    if (contributeAmount > availableInStage) {
                        contributeAmount = availableInStage;
                    }
                    stageRemaining[currentStage] -= contributeAmount;

                    remainingPayment -= contributeAmount;

                    emit Contribution(user, orderNo, currentStage, contributeAmount, whiteUser, block.timestamp);

                    if (stageRemaining[currentStage] == 0) {
                        advanceStage();
                    }
                }
                allocation(usdtAmount - remainingPayment);

                if (remainingPayment > 0) {
                    usdt.transfer(vaulat, remainingPayment);
                }
            }

            return remainingPayment;
        }
    }

    function allocation(uint256 amt) private {
        if (amt > 0) {
            uint256 amt1 = (amt * 7) / 10;
            uint256 amt2 = (amt * 8) / 100;
            uint256 amt3 = (amt * 7) / 100;
            usdt.transfer(RECEIVE, amt1);
            usdt.transfer(vaulat, amt2);
            usdt.transfer(LEADER, amt3);
            usdt.transfer(MARKET, amt - amt1 - amt2 - amt3);
        }
    }

    function advanceStage() private {
        if (currentStage < 2) {
            currentStage++;
            emit StageAdvanced(currentStage);
        } else {
            isActive = false;
            emit FundingCompleted();
        }
    }

    function claimToken(address[] calldata users, uint256[] calldata amts) external onlyAdmin {
        for (uint256 i = 0; i < users.length; i++) {
            hest.transfer(users[i], amts[i]);
        }
    }
    function setWhitelist(address[] calldata users, uint256[] calldata amts) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelist[users[i]] = amts[i];
        }
    }
    function setAdmin(address _user) external onlyOwner {
        admin = _user;
    }
    function reset() external onlyOwner {
        stageRemaining[0] = PHASE1_TARGET;
        stageRemaining[1] = PHASE2_TARGET;
        stageRemaining[2] = PHASE3_TARGET;
        isActive = true;
    }
    function setStageRemaining(uint256 _stage, uint256 _usdt) external onlyOwner {
        stageRemaining[_stage] = _usdt;
    }
    function setIsActive(bool _isActive) external onlyOwner {
        isActive = _isActive;
    }

    function setHest(address _hest) external onlyOwner {
        hest = IERC20(_hest);
    }

    function refundToken(address token) external onlyOwner {
        IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }
    function getCurrentStageInfo() public view returns (uint256 remaining, uint256 maxContribution) {
        return (currentStage, stageRemaining[currentStage]);
    }
}
