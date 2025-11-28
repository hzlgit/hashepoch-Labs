// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IPancakeRouter02.sol";
import "./TransferHelper.sol";

interface IHEST is IERC20 {
    function burn(uint256 amount) external returns (bool);
}

contract HESTBuyBack is Ownable {
    address public USDT;
    address public USDC;
    address public HEST;
    address public router;

    event SwapAndBurn(uint256 indexed orderId, address indexed token, uint256 amountIn, uint256 hestAmt, uint256 time);
    error TokenError();

    constructor(address _usdt, address _usdc, address _hest, address _router) Ownable(msg.sender) {
        USDT = _usdt;
        HEST = _hest;
        router = _router;
        USDC = _usdc;
    }

    function refundToken(address _token, address to) external onlyOwner {
        IERC20(_token).transfer(to, IERC20(_token).balanceOf(address(this)));
    }

    function buyBack(address token, uint256 orderId) external {
        if (token != USDT && token != USDC) {
            revert TokenError();
        }
        uint256 amt = IERC20(token).balanceOf(address(this));
        if (amt > 0) {
            address[] memory path;
            if (token == USDT) {
                path = new address[](2);
                path[0] = USDT;
                path[1] = HEST;
            } else {
                path = new address[](3);
                path[0] = USDC;
                path[1] = USDT;
                path[2] = HEST;
            }

            uint256[] memory amountOuts = getAmountOut(path, amt);
            TransferHelper.safeApprove(token, router, amt);
            _swapTokens(path, amt, token == USDT ? amountOuts[1] : amountOuts[2]);
            uint256 hestAmt = IHEST(HEST).balanceOf(address(this));
            IHEST(HEST).burn(hestAmt);
            emit SwapAndBurn(orderId, token, amt, hestAmt, block.timestamp);
        }
    }

    function _swapTokens(address[] memory path, uint256 tokenAmount, uint256 amountMin) internal {
        IPancakeRouter02(router).swapExactTokensForTokensSupportingFeeOnTransferTokens(
            tokenAmount,
            (amountMin * 90) / 100,
            path,
            address(this),
            block.timestamp
        );
    }

    function getAmountOut(address[] memory path, uint256 amt) public view returns (uint256[] memory) {
        return IPancakeRouter02(router).getAmountsOut(amt, path);
    }
}
