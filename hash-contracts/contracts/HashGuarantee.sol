// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/IHashGameFactory.sol";
import "./interfaces/IHashGuarantee.sol";

contract HashGuarantee is IHashGuarantee, ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public factory;

    address public manager;

    address[] public tokens;

    address game;

    mapping(uint256 => bool) public transfed;

    modifier onlyManager() {
        _checkManager();
        _;
    }

    event Transfed(uint256 indexed issue, uint);

 
    error InvalidTxid();
    error InvalidHashEpochVaulat();

    constructor() {
        factory = msg.sender;
    }

    function initialize(
        address _manager,
        address gameAddr,
        address[] calldata _tokens
    ) external {
        require(msg.sender == factory, "HashEpoch: FORBIDDEN");
        manager = _manager;
        tokens = _tokens;
        game = gameAddr;
        for(uint256 i = 0; i< _tokens.length;i++) {
          IERC20(_tokens[i]).approve(vaulat(),type(uint256).max);
        }
    }

    function _checkManager() internal view virtual {
        require(manager == msg.sender, "HashEpoch: caller is not the manager");
    }

    function transfer(
        uint256 txId,
         uint8[] calldata _tokenType,
        uint256[] calldata _amts
    ) external nonReentrant onlyManager {
        if (transfed[txId]) {
            revert InvalidTxid();
        }
        address _vaulat = vaulat();
        transfed[txId] = true;
        for (uint256 i = 0; i < _amts.length; i++) {
            address token = tokens[_tokenType[i]];
            _transferToken(token, _vaulat, _amts[i]);
        }
        emit Transfed(txId, block.timestamp);
    }

    function setTokens(address [] calldata _tokens) external nonReentrant onlyManager{
      tokens = _tokens;
        for(uint256 i = 0; i< _tokens.length;i++) {
          IERC20(_tokens[i]).approve(vaulat(),type(uint256).max);
        }
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
