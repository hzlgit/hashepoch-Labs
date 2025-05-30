// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/IHashGameFactory.sol";
import "./interfaces/IHashGame.sol";

contract HashGame is IHashGame, ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public factory;

    uint256 public constant BASE_RATE = 10000;

    address[] public accounts;

    uint256[] public rates;

    address public manager;

    address[] public tokens;

    address public guarantee;

    mapping(uint256 => bool) public settled;

    modifier onlyManager() {
        _checkManager();
        _;
    }

    event GameSettled(uint256 indexed issue, uint);
    error InvalidSettleAmount();
    error InvalidGameIssue();
    error InvalidHashEpochVaulat();

    constructor() {
        factory = msg.sender;
    }

    function initialize(
        address _manager,
        address _guarantee,
        address[] calldata _tokens,
        address[] calldata _accounts,
        uint256[] calldata _rates
    ) external {
        require(msg.sender == factory, "HashEpoch: FORBIDDEN");
        require(_accounts.length == _rates.length, "HashEpoch: PARAMS ERROR");
        manager = _manager;
        guarantee = _guarantee;
        tokens = _tokens;
        rates = _rates;
        accounts = _accounts;
    }

    function _checkManager() internal view virtual {
        require(manager == msg.sender, "HashEpoch: caller is not the manager");
    }

    function settle(
        uint256 issue,
        uint256[] calldata _guaranteeAmts,
        uint256[] calldata _amts
    ) external nonReentrant onlyManager {
        if (settled[issue]) {
            revert InvalidGameIssue();
        }
        address _vaulat = vaulat();
        settled[issue] = true;

        for (uint256 i = 0; i < tokens.length; i++) {
            uint256 total = tokens[i] == address(0)
                ? address(this).balance
                : IERC20(tokens[i]).balanceOf(address(this));

            uint256 settleAmt = _amts[i];
            if (settleAmt > total) {
                revert InvalidSettleAmount();
            }
            if (total <= 0 || settleAmt <= 0) {
                continue;
            }
            uint256 balance = settleAmt;
            for (uint256 j = 0; j < accounts.length; j++) {
                uint256 amt = (settleAmt * rates[i]) / BASE_RATE;
                _transferToken(tokens[i], accounts[j], amt);
                balance -= amt;
            }
            if (balance > 0) {
                _transferToken(tokens[i], _vaulat, balance);
            }

            if (_guaranteeAmts[i] > 0 && guarantee != address(0)) {
                _transferToken(tokens[i], guarantee, _guaranteeAmts[i]);
            }
        }

        emit GameSettled(issue, block.timestamp);
    }

    function vaulat() public view returns (address) {
        return IHashGameFactory(factory).vaulat();
    }

    function recover() external {
        if (msg.sender != vaulat()) {
            revert InvalidHashEpochVaulat();
        }
        for (uint256 i = 0; i < tokens.length; i++) {
            uint256 total = tokens[i] == address(0)
                ? address(this).balance
                : IERC20(tokens[i]).balanceOf(address(this));
            _transferToken(tokens[i], vaulat(), total);
        }
    }

    function _transferToken(address token, address to, uint256 amt) internal {
        if (token == address(0)) {
            (bool success, ) = to.call{ value: amt }("");
            if (!success) {
                revert();
            }
        } else {
            IERC20(token).transfer(to, amt);
        }
    }

    receive() external payable {
        bool supWeth = false;
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == address(0)) {
                supWeth = true;
                break;
            }
        }
        require(supWeth == true, "HashEpoch: Doesn't support BNB");
    }
}
