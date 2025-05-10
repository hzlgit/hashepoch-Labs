// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

interface IHashGameFactory {
    event GameCreated(address indexed token0, address indexed token1, address pair, uint);

    function vaulat() external view returns (address);
    function getGame(uint256 gameNo) external view returns (address game);

    function allGames(uint) external view returns (address game);
    function allGamesLength() external view returns (uint);

    function createGame(
        uint256 gameNo,
        address _manager,
        address _guarantee,
        address[] calldata _tokens,
        address[] calldata _accounts,
        uint256[] calldata _rates
    ) external returns (address game);
}
