// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSD is ERC20 {
    constructor() ERC20("hash Mock usd", "mUSDT") {
        _mint(msg.sender, 100000000 * 10 ** 18);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
