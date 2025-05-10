import { ZeroAddress, parseUnits } from "ethers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

const vaulat = "0x714870047CAD91bdC8308Eb193Dc2B035d0453c9";
const usdt = "0x269f26eE53a4B6ccbebB025A5ec1Fdd0F21c3e2a";
const factory = "0x22c1972d4177F1f39454CB0f80a925C148614566";
const Game = "0x23cc71aedb839322778f6d6cb3c110f551e475ca";
task("task:vaulat", "add fail users", async (_taskArgs, { ethers }) => {
  const [owner, mgr] = await ethers.getSigners();

  try {
    const Vaulat = await ethers.getContractAt("HashVaulat", vaulat, owner);
    const HashGameFactory = await ethers.getContractAt("HashGameFactory", factory, mgr);
    const HashGame = await ethers.getContractAt("HashGame", Game, mgr);
    // await Vaulat.setMaxWithdrawAmount(usdt, parseUnits("10000", 18));
    // console.log(await Vaulat.owner());
    // console.log(await Vaulat.supportTokens(usdt));
    // console.log(await Vaulat.admin());
    // await Vaulat.setFactory(factory);
    // await Vaulat.setAdmin("0xdD107Da03a4AC10914ebA256F8EAA32fC735003A");
    // console.log(await Vaulat.maxWithdrawAmount(usdt));
    // console.log(await Vaulat.factory());
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

    // await HashGame.settle(0, [0], [parseUnits("1", 18)]);
    // console.log(await HashGame.accounts(0));
    // console.log(await HashGame.rates(0));
  } catch (e) {
    console.log(e);
  }
});
