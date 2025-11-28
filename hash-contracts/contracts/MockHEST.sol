// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockHEST is ERC20 {
    constructor() ERC20("HEST", "HEST") {
        _mint(msg.sender, 100000000 * 10 ** 18);
        _mint(0xdD107Da03a4AC10914ebA256F8EAA32fC735003A, 100000000 * 10 ** 18);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
