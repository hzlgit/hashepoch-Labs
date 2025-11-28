// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSD is ERC20 {

     uint8 _decimals = 18;
    constructor(string memory name, string memory symbol,uint8 decimals) ERC20(name, symbol) {
        _decimals = decimals;
        _mint(msg.sender, 100000000 * 10 ** decimals);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }

     function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}
