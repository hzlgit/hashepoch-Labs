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
