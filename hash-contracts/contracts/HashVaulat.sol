// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./interfaces/IHashGameFactory.sol";
import "./interfaces/IHashGame.sol";

contract HashVaulat is Initializable, OwnableUpgradeable {
    using SafeERC20 for IERC20;

    // Aave V3 Pool Addresses Provider
    IPoolAddressesProvider public ADDRESSES_PROVIDER;
    IPool public POOL;
    mapping(address => bool) public supportTokens;
    mapping(address => bool) public stakeTokens;
    mapping(uint256 => bool) public withdrawId;
    mapping(uint256 => bool) public betId;
    bool public stakeEnable;

    mapping(address => uint256) public minStakeAmt;
    mapping(address => uint256) public maxWithdrawAmount;

    address public manager;
    address public factory;
    address public admin;

    event Stake(address indexed _token, uint256 indexed _amount, uint256 _shares);
    event Redeem(address indexed _token, uint256 indexed _shares, uint256 _amount);
    event Deposit(uint256 indexed _id, address indexed _user, address indexed _token, uint256 _amount, uint256 _time);
    event Withdraw(uint256 indexed _id, address indexed _user, address indexed _token, uint256 _amount, uint256 _time);
    event Bet(uint256 indexed _id, address indexed user, uint256 indexed _gameNo, uint256 _issue, uint256 _time);
    event TransferAdmin(uint256 indexed _id, uint256 indexed _gameNo, uint256 _issue, uint256 _time);
    error InvalidToken();
    error InvalidDepositAmount();
    error InvalidWithdrawAmount();
    error InvalidGame();
    error InvalidBetAmount();

    modifier notSupportToken(address token) {
        if (!supportTokens[token]) revert InvalidToken();
        _;
    }

    function initialize(address _manager, address _owner, address _addressesProvider) public initializer {
        __Ownable_init(_owner);
        manager = _manager;
        // ADDRESSES_PROVIDER = IPoolAddressesProvider(_addressesProvider);
        // POOL = IPool(ADDRESSES_PROVIDER.getPool());
        supportTokens[address(0)] = true;
        maxWithdrawAmount[address(0)] = 5 * 1e18;
    }

    function getProvider() public view returns (address) {
        return address(ADDRESSES_PROVIDER);
    }

    function _stake(address token, uint256 amount) internal {
        address A_TOKEN = getAToken(token);
        IERC20(token).safeIncreaseAllowance(address(POOL), amount);
        uint256 beforeAmt = IERC20(A_TOKEN).balanceOf(address(this));
        //  stake Token to Aave V3 and get Atoken
        POOL.supply(address(token), amount, address(this), 0);

        uint256 afterAmt = IERC20(A_TOKEN).balanceOf(address(this));

        emit Stake(token, amount, afterAmt - beforeAmt);
    }

    function _redeem(address token, uint256 amount) internal {
        IERC20 A_TOKEN = IERC20(getAToken(token));
        uint256 totalShares = A_TOKEN.balanceOf(address(this));
        uint256 redeemShares = totalShares;
        if (amount < totalAssets()) {
            redeemShares = (amount * totalShares) / totalAssets();
        }
        // 1. withdraw aToken amount
        uint256 tokenBefore = IERC20(token).balanceOf(address(this));
        // 2. withdraw Token from Aave V3
        POOL.withdraw(address(token), redeemShares, address(this));

        uint256 tokenAfter = IERC20(token).balanceOf(address(this));

        emit Redeem(token, amount, tokenAfter - tokenBefore);
    }

    function deposit(uint256 orderId, address token, uint256 amount) external payable notSupportToken(token) {
        if (token != address(0)) {
            IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

            if (stakeEnable && amount > minStakeAmt[token] && stakeTokens[token]) {
                uint256 _amt = (amount * 7) / 10;
                _stake(token, _amt > minStakeAmt[token] ? _amt : minStakeAmt[token]);
            }
        } else if (msg.value != amount) {
            revert InvalidDepositAmount();
        }

        emit Deposit(orderId, msg.sender, token, amount, block.timestamp);
    }

    function withdraw(
        uint256 orderId,
        address user,
        address token,
        uint256 amount,
        uint256 deadline,
        bytes memory signature
    ) external notSupportToken(token) {
        checkSign(orderId, user, token, amount, 0, deadline, signature);
        require(!withdrawId[orderId], "Order exist");

        withdrawId[orderId] = true;
        if (amount > maxWithdrawAmount[token]) {
            revert InvalidWithdrawAmount();
        }
        if (token != address(0)) {
            uint256 tokenBalance = IERC20(token).balanceOf(address(this));
            if (amount > tokenBalance) {
                _redeem(token, amount);
            }
            IERC20(token).transfer(user, amount);
        } else {
            (bool success, ) = user.call{ value: amount }("");
            if (!success) {
                revert();
            }
        }

        emit Withdraw(orderId, user, token, amount, block.timestamp);
    }

    function bet(
        uint256 orderId,
        address user,
        uint256 gameNo,
        uint256 issue,
        address token,
        uint256 amount,
        uint256 guaranteeAmt,
        uint256 deadline,
        bytes memory signature
    ) external payable notSupportToken(token) {
        checkSign(orderId, user, token, amount, guaranteeAmt, deadline, signature);
        require(!betId[orderId], "Order exist");

        betId[orderId] = true;
        address game = _checkGameNo(gameNo);
        address guaranteeAddr = IHashGame(game).guarantee();
        if (token == address(0)) {
            if (amount != msg.value) {
                revert InvalidBetAmount();
            }
        } else {
            if (guaranteeAmt > 0 && guaranteeAddr != address(0)) {
                IERC20(token).safeTransferFrom(guaranteeAddr, game, amount);
            }
            IERC20(token).safeTransferFrom(user, game, amount);
        }
        emit Bet(orderId, user, gameNo, issue, block.timestamp);
    }

    function transferAdmin(
        uint256 orderId,
        uint256 gameNo,
        uint256 issue,
        address token,
        uint256 amount,
        uint256 guaranteeAmt
    ) external notSupportToken(token) {
        require(msg.sender == admin, "Invalid sender");
        require(!betId[orderId], "Order exist");
        betId[orderId] = true;
        address game = _checkGameNo(gameNo);

        if (token == address(0)) {
            (bool success, ) = game.call{ value: amount }("");
            if (!success) {
                revert();
            }
        } else {
            address guaranteeAddr = IHashGame(game).guarantee();
            if (guaranteeAmt > 0 && guaranteeAddr != address(0)) {
                IERC20(token).safeTransferFrom(guaranteeAddr, game, amount);
            }
            uint256 tokenBalance = IERC20(token).balanceOf(address(this));
            if (amount > tokenBalance) {
                _redeem(token, amount);
            }

            IERC20(token).transfer(game, amount);
        }
        emit TransferAdmin(orderId, gameNo, issue, block.timestamp);
    }

    function _checkGameNo(uint256 gameNo) internal view returns (address game) {
        game = IHashGameFactory(factory).getGame(gameNo);
        if (game == address(0)) {
            revert InvalidGame();
        }
    }

    function getChainId() public view returns (uint256) {
        return block.chainid;
    }

    function checkSign(
        uint256 orderId,
        address user,
        address token,
        uint256 amount,
        uint256 gAmount,
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
                keccak256(abi.encode(getChainId(), orderId, user, token, amount, gAmount, deadline))
            )
        );

        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == manager, "INVALID_SIGNATURE");
    }

    receive() external payable {}
    /**
     * @dev Returns the total assets (USDT + interest) held by the contract.
     * @return The total assets held by the contract.
     */
    function totalAssets() public view returns (uint256) {
        (uint256 totalCollateralBase, , , , , ) = POOL.getUserAccountData(address(this));
        return totalCollateralBase;
    }

    /**
     * @dev Returns the address of the aToken for a specific token.
     * @param token The address of the token.
     * @return The address of the aToken.
     */
    function getAToken(address token) public view returns (address) {
        return POOL.getReserveData(token).aTokenAddress;
    }

    /**
     * @dev Allows the owner to refund mistakenly sent tokens.
     * @param token The address of the token to refund.
     * @param to The address to send the refunded tokens to.
     * @param amount The amount of tokens to refund.
     */
    function refoundMisToken(address token, address to, uint256 amount) external onlyOwner {
        if (token == address(0)) {
            (bool success, ) = to.call{ value: amount }("");
            if (!success) {
                revert();
            }
        } else {
            IERC20(token).transfer(to, amount);
        }
    }

    function setFactory(address _factory) external onlyOwner {
        factory = _factory;
    }
    function setManager(address _manager) external onlyOwner {
        manager = _manager;
    }
    function setStakeEnabled(bool _enabled) external onlyOwner {
        stakeEnable = _enabled;
    }

    function setSupportTokens(address _token, bool supped) external onlyOwner {
        supportTokens[_token] = supped;
    }
    function setMaxWithdrawAmount(address _token, uint256 max) external onlyOwner {
        maxWithdrawAmount[_token] = max;
    }

    function setMinStakeAmount(address _token, uint256 _min) external onlyOwner {
        minStakeAmt[_token] = _min;
    }
    function setAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }
}
