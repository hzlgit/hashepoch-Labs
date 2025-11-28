// SPDX-License-Identifier: MIT
pragma solidity =0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IHashGameFactory.sol";
import "./interfaces/IHashGame.sol";
import "./HashGame.sol";
import "./interfaces/IHashGuarantee.sol";
import "./HashGuarantee.sol";

contract HashGameFactory is IHashGameFactory, Ownable {
    bytes32 public immutable INIT_CODE_GAME_HASH;

    mapping(uint256 => address) public getGame;
    address[] public allGames;

    address public vaulat;
    address public admin;

    event GameCreated(uint256 indexed gameNo, address indexed game,address guarantee, uint);

    constructor(address _vaulat, address _owner, address _admin) Ownable(_owner) {
        vaulat = _vaulat;
        admin = _admin;

        INIT_CODE_GAME_HASH = keccak256(abi.encodePacked(type(HashGame).creationCode));
    }

    function allGamesLength() external view returns (uint) {
        return allGames.length;
    }

    function createGame(
        uint256 gameNo,
        address _manager,
        bool _createGuarantee,
        address[] calldata _tokens,
        address[] calldata _accounts,
        uint256[] calldata _rates
    ) external returns (address game) {
        require(msg.sender == admin, "Invalid sender");
        require(getGame[gameNo] == address(0), "HashEpoch: GAME_EXISTS");
        bytes memory bytecode = type(HashGame).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(gameNo));
        address guarantee;
        assembly {
            game := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        if(_createGuarantee) {
            bytes memory bytecode2 = type(HashGuarantee).creationCode;
            assembly {
                guarantee := create2(0, add(bytecode2, 32), mload(bytecode2), salt)
            }
            IHashGame(game).initialize(_manager, guarantee, _tokens, _accounts, _rates);
            IHashGuarantee(guarantee).initialize(_manager, game, _tokens);
        } else {
            IHashGame(game).initialize(_manager, guarantee, _tokens, _accounts, _rates);
        }
     
        getGame[gameNo] = game;
        allGames.push(game);
        emit GameCreated(gameNo, game,guarantee, allGames.length);
    }

    function setAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }

    function setVaulat(address _vaulat) external onlyOwner {
        vaulat = _vaulat;
    }
}
