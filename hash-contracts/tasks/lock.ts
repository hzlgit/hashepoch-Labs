import { ZeroAddress, parseUnits } from "ethers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

const vaulat = "0x714870047CAD91bdC8308Eb193Dc2B035d0453c9";
const usdt = "0x269f26eE53a4B6ccbebB025A5ec1Fdd0F21c3e2a";
const factory = "0x6acCF37e002d55ECB6C59347D36df8f6871A548F";
const Game = "0x0c008654cb06c8ced637f12c1a4e965f3776367f";
const Game2 = "0x120cf2dcc50c254Ef8cBbE53479b51d96E9c7036";
task("task:vaulat", "add fail users", async (_taskArgs, { ethers }) => {
  const [owner, mgr] = await ethers.getSigners();

  try {
    const Vaulat = await ethers.getContractAt("HashVaulat", vaulat, owner);
    const HashGameFactory = await ethers.getContractAt("HashGameFactory", factory, mgr);
    const HashGame = await ethers.getContractAt("HashGame", Game, mgr);
    const HashGame2 = await ethers.getContractAt("HashGame", Game2, mgr);
    // await Vaulat.setMaxWithdrawAmount(usdt, parseUnits("10000", 18));
    // console.log(await Vaulat.owner());
    // console.log(await Vaulat.supportTokens(usdt));
    // console.log(await Vaulat.admin());
    // await Vaulat.setFactory(factory);
    // await Vaulat.setAdmin("0xdD107Da03a4AC10914ebA256F8EAA32fC735003A");
    // console.log(await Vaulat.maxWithdrawAmount(usdt));
    console.log(await Vaulat.factory());
    // await HashGameFactory.setAdmin(owner.address);
    // console.log(await HashGameFactory.getGame(10010101));
    // await HashGameFactory.createGame(
    //   "10010101",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   ZeroAddress,
    //   [usdt],
    //   ["0xa947b121DC78514e0C3903EfAA1e1fe76cE54BcA"],
    //   [500],
    // );

    // await HashGameFactory.createGame(
    //   "10010102",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   ZeroAddress,
    //   [ZeroAddress],
    //   ["0xa947b121DC78514e0C3903EfAA1e1fe76cE54BcA"],
    //   [500],
    // );

    await HashGame.settle(0, [0], [parseUnits("1", 18)]);
    // await HashGame2.settle(0, [0], [parseUnits("0.0001", 18)]);

    // console.log(await HashGame2.accounts(0));
    // console.log(await HashGame2.rates(0));
  } catch (e) {
    console.log(e);
  }
});

task("task:main", "add fail users", async (_taskArgs, { ethers }) => {
  const [owner, mgr] = await ethers.getSigners();
  const USDT = "0x55d398326f99059fF775485246999027B3197955";
  const USDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
  try {
    const Vaulat = await ethers.getContractAt("HashVaulat", "0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d", owner);
    const HashGameFactory = await ethers.getContractAt(
      "HashGameFactory",
      "0xd506d7fc93a4f58946AD171691916F123e94a1bc",
      owner,
    );
    // const HashGame = await ethers.getContractAt("HashGame", Game, mgr);
    // const HashGame2 = await ethers.getContractAt("HashGame", Game2, mgr);
    // await Vaulat.setMaxWithdrawAmount(usdt, parseUnits("10000", 18));
    // console.log(await Vaulat.owner());
    console.log(await Vaulat.factory());
    // console.log(await Vaulat.admin());

    // await Vaulat.setAdmin("0xdD107Da03a4AC10914ebA256F8EAA32fC735003A");
    // console.log(await Vaulat.maxWithdrawAmount(usdt));
    // await await Vaulat.setStakeTokens(USDC, true);
    // console.log(await Vaulat.stakeTokens(USDC));
    // console.log(await Vaulat.stakeTokens(USDT));
    // console.log(await Vaulat.minStakeAmt(USDT));

    // await await Vaulat.setManager("0x546a414dac0cd7c82df9a7c692f7a37d615d4366");
    // await await Vaulat.setMaxWithdrawAmount(USDT, parseUnits("10000", 18));
    // await await Vaulat.setMaxWithdrawAmount(USDC, parseUnits("10000", 18));
    await await Vaulat.setMinStakeAmount(USDC, parseUnits("10", 18));
    await await Vaulat.setMinStakeAmount(USDT, parseUnits("10", 18));
    // console.log(await Vaulat.POOL());
    // await HashGameFactory.setAdmin(owner.address);
    // console.log(await HashGameFactory.getGame(10010101));
    console.log(await HashGameFactory.admin());
    // console.log(await HashGameFactory.())
    // await await HashGameFactory.createGame(
    //   "10010101",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [ZeroAddress],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010102",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );

    // await await HashGameFactory.createGame(
    //   "10010103",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDC],
    //   [],
    //   [],
    // );

    // await await HashGameFactory.createGame(
    //   "10010104",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await Vaulat.refoundGameAssets("10010101");

    // await HashGame.settle(0, [0], [parseUnits("1", 18)]);
    // await HashGame2.settle(0, [0], [parseUnits("0.0001", 18)]);

    // console.log(await HashGame2.accounts(0));
    // console.log(await HashGame2.rates(0));
  } catch (e) {
    console.log(e);
  }
});
