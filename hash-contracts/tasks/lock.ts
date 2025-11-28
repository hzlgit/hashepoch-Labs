import { ZeroAddress, formatUnits, parseUnits } from "ethers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

const vaulat = "0x714870047CAD91bdC8308Eb193Dc2B035d0453c9";
const usdt = "0x269f26eE53a4B6ccbebB025A5ec1Fdd0F21c3e2a";
const hest = "0x2F27349894cA60bAADf0eDCfa35FF88F51A0Ddd8";
const factory = "0x8F1dD840d1e2CFbE471eC0cF11026E7D3E6a266E"; //"0x6acCF37e002d55ECB6C59347D36df8f6871A548F";

task("task:vaulat", "add fail users", async (_taskArgs, { ethers }) => {
  const [owner, mgr] = await ethers.getSigners();

  try {
    const Vaulat = await ethers.getContractAt("HashVaulat", vaulat, mgr);
    const USDT = await ethers.getContractAt("ERC20", usdt, owner);
    const HashGameFactory = await ethers.getContractAt("HashGameFactory", factory, mgr);
    const HashGame = await ethers.getContractAt("HashGame", "0xdDBa7F388Da3f481C7F0A1B8C41Ad5eFD30aC2a8", mgr);
    await await USDT.transfer("0xb4cff540bdba1e6ff922d8b21a071f5b86fd6c10", parseUnits("100000", 18));
    // console.log(mgr.address);
    // console.log(await HashGame.guarantee());
    // console.log(await Vaulat.factory());
    // await await Vaulat.setFactory(factory);
    // await await Vaulat.transferGuarantee("1", "12101000", usdt, 100);
    // await await Vaulat.transferAdmin("0", "12101000", "1", usdt, 100, 0);
    // await HashGameFactory.createGame(
    //   "12101000",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   true,
    //   [
    //     "0x269f26ee53a4b6ccbebb025a5ec1fdd0f21c3e2a",
    //     "0x5bc30872d2f929656a0dc2a9dcc6a66b10722589",
    //     "0x2f27349894ca60baadf0edcfa35ff88f51a0ddd8",
    //   ],
    //   ["0x1a1b72542218aae36efd37a8008514e1ad24c8db"],
    //   [0],
    // );
    // await await Vaulat.setFactory(factory);
    // await await Vaulat.setSupportTokens("0x3ec7E75110c35FE1fbd6F5eF881Adb3a51B682A0", true);
    // await await Vaulat.setSupportTokens("0x4AbF754556d587d2bfd23BBC8e4F3A4e3a1B3BC3", true);
    // await await Vaulat.setSupportTokens("0xf8FE2f215FfD0f987fa989477C7fAbb579497Bd0", true);
    // await await Vaulat.setSupportTokens("0xdA125b626258b3055D26c8D83131aACDF916e70b", true);
    // await await Vaulat.setSupportTokens("0x1b73ce8526D03C4f80fab41E8348Ea1704632AE0", true);
    // await Vaulat.setMaxWithdrawAmount("0x3ec7E75110c35FE1fbd6F5eF881Adb3a51B682A0", parseUnits("10000", 6));
    // await Vaulat.setMaxWithdrawAmount("0x4AbF754556d587d2bfd23BBC8e4F3A4e3a1B3BC3", parseUnits("10000", 18));
    // await Vaulat.setMaxWithdrawAmount("0xf8FE2f215FfD0f987fa989477C7fAbb579497Bd0", parseUnits("10000", 18));
    // await Vaulat.setMaxWithdrawAmount("0xdA125b626258b3055D26c8D83131aACDF916e70b", parseUnits("10000", 18));
    // await Vaulat.setMaxWithdrawAmount("0x1b73ce8526D03C4f80fab41E8348Ea1704632AE0", parseUnits("10000", 18));
    // await await Vaulat.setFactory(factory);
    // await await Vaulat.setWhiteTarget("0xd17f1155205f9c9b54ca176d1a8b632320ab949d", true);

    // const HashGame = await ethers.getContractAt("HashGame", Game, mgr);
    // const HashGame2 = await ethers.getContractAt("HashGame", Game2, mgr);
    // await Vaulat.setMaxWithdrawAmount(usdt, parseUnits("10000", 18));
    // console.log(await Vaulat.owner());
    // console.log(await Vaulat.supportTokens(usdt));
    // console.log(await Vaulat.admin());
    // await Vaulat.setFactory(factory);
    // await Vaulat.setAdmin("0xdD107Da03a4AC10914ebA256F8EAA32fC735003A");
    // console.log(await Vaulat.maxWithdrawAmount(usdt));
    // console.log(await Vaulat.factory());
    // console.log(await HashGameFactory.admin());
    // console.log(mgr.address);
    // const HashIDO = await ethers.getContractAt("HashIDO", "0x680e6795BA9Ff5378450Fd3D574E244D2f2B625a", owner);
    // console.log(await HashIDO.stageRemaining(0));
    // await await HashIDO.setIsActive(true);
    // await await Vaulat.setSupportTokens(hest, true);
    // await await Vaulat.setMaxWithdrawAmount(hest, parseUnits("10000", 18));
    // await await HashGameFactory.setAdmin("0xdd107da03a4ac10914eba256f8eaa32fc735003a");
    // await await Vaulat.setWhiteTarget("0x680e6795BA9Ff5378450Fd3D574E244D2f2B625a", true);
    // await await HashIDO.setWhitelist(["0x5467d7601ae4feF667A45fFAbcE57A346a0Ba116"], [parseUnits("100", 18)]);
    // await await HashIDO.setIsActive(true);
    // console.log(await HashGameFactory.getGame("10020100"));
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

    // await await HashGameFactory.createGame(
    //   "10010107",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   ZeroAddress,
    //   [usdt],
    //   ["0xa947b121DC78514e0C3903EfAA1e1fe76cE54BcA"],
    //   [500],
    // );
    // await await HashGameFactory.createGame(
    //   "10010108",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   ZeroAddress,
    //   [usdt],
    //   ["0xa947b121DC78514e0C3903EfAA1e1fe76cE54BcA"],
    //   [500],
    // );
    // await await HashGameFactory.createGame(
    //   "10010109",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   ZeroAddress,
    //   [usdt],
    //   ["0xa947b121DC78514e0C3903EfAA1e1fe76cE54BcA"],
    //   [500],
    // );
    // await await HashGameFactory.createGame(
    //   "10020100",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   "0x5467d7601ae4feF667A45fFAbcE57A346a0Ba116",
    //   [usdt],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010118",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   ZeroAddress,
    //   [usdt],
    //   ["0xa947b121DC78514e0C3903EfAA1e1fe76cE54BcA"],
    //   [500],
    // );

    // await await HashGameFactory.createGame(
    //   "10020700",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   "0x5467d7601ae4feF667A45fFAbcE57A346a0Ba116",
    //   [usdt],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10021200",
    //   "0xdD107Da03a4AC10914ebA256F8EAA32fC735003A",
    //   "0x5467d7601ae4feF667A45fFAbcE57A346a0Ba116",
    //   [usdt],
    //   [],
    //   [],
    // );
    // await HashGame.settle(0, [0], [parseUnits("1", 18)]);
    // await HashGame2.settle(0, [0], [parseUnits("0.0001", 18)]);

    // console.log(await HashGame2.accounts(0));
    // console.log(await HashGame2.rates(0));
    // console.log(await HashGameFactory.getGame(10010101));
    // console.log(await HashGame.tokens(0));
    // console.log(await HashGame.tokens(1));
  } catch (e) {
    console.log(e);
  }
});

task("task:main", "add fail users", async (_taskArgs, { ethers }) => {
  const [owner, nodeOwner] = await ethers.getSigners();
  const USDT = "0x55d398326f99059fF775485246999027B3197955";
  const USDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
  const HEST = "0x08c02dbc56988db081DD3F3511e6ba1D56C63b0E";
  const NodeV2 = "0xcFDC0492798CcC2434A3E47dcd463166Ca1BCbBF";
  try {
    const Vaulat = await ethers.getContractAt("HashVaulat", "0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d", owner);
    const HashGameFactory = await ethers.getContractAt(
      "HashGameFactory",
      "0x755A6612b4Cc7f6e34533e6d7703588C5b44a762",
      // "0xd506d7fc93a4f58946AD171691916F123e94a1bc",
      owner,
    );
    const USDTC = await ethers.getContractAt("ERC20", USDT, owner);
    const HESTC = await ethers.getContractAt("ERC20", HEST, owner);
    const USDCC = await ethers.getContractAt("ERC20", USDC, owner);
    const Node = await ethers.getContractAt("HashNode", "0x094980F5b6B8C5B575187Cc86E82ed6EC0eFA135", nodeOwner);
    // await await Vaulat.setWhiteTarget("0x1e218DC2F7A03cC4dd3a55656d9089919589ac71", true);
    console.log("usdt ", formatUnits(await USDTC.balanceOf("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"), 18));
    console.log("usdc ", formatUnits(await USDCC.balanceOf("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"), 18));
    console.log("hest ", formatUnits(await HESTC.balanceOf("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"), 18));
    console.log(
      "bnb ",
      formatUnits(await ethers.provider.getBalance("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"), 18),
    );
    // await await Vaulat.refoundMisToken(
    //   USDC,
    //   "0x7a7a75b1e39402dd3f524e48883061d530f7e0de",
    //   await USDCC.balanceOf("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"),
    // );
    // await await Vaulat.refoundMisToken(
    //   USDT,
    //   "0x7a7a75b1e39402dd3f524e48883061d530f7e0de",
    //   await USDTC.balanceOf("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"),
    // );
    // await await Vaulat.refoundMisToken(
    //   ZeroAddress,
    //   "0x7a7a75b1e39402dd3f524e48883061d530f7e0de",
    //   await ethers.provider.getBalance("0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d"),
    // );

    // await await Vaulat.setStakeTokens(USDT, false);
    // await await Vaulat.setStakeTokens(USDC, false);
    // await await Vaulat.setStakeEnabled(false);
    // await await Vaulat.redeemAll(USDC);
    // console.log(await USDTC.balanceOf(Node.getAddress()));
    // await await Node.withdrawAssets(USDT, "0x34f534a2882a4b46a34fb55ac377908d2224777a", 257167819000000000000n);
    // await await Vaulat.refoundGameAssets("")
    // 4001165179999600000000000n
    // console.log(await Node.manager());
    // await await Vaulat.setSupportTokens("0xc9882def23bc42d53895b8361d0b1edc7570bc6a", true);
    // await await Vaulat.setSupportTokens("0x924fa68a0fc644485b8df8abfa0a41c2e7744444", true);
    // await await Vaulat.setSupportTokens("0x000ae314e2a2172a039b26378814c252734f556a", true);
    // await await Vaulat.setSupportTokens("0x0a43fc31a73013089df59194872ecae4cae14444", true);
    // await await Vaulat.setSupportTokens("0x47474747477b199288bf72a1d702f7fe0fb1deea", true);
    // await Vaulat.setMaxWithdrawAmount("0xc9882def23bc42d53895b8361d0b1edc7570bc6a", parseUnits("5000000", 6));
    // await Vaulat.setMaxWithdrawAmount("0x924fa68a0fc644485b8df8abfa0a41c2e7744444", parseUnits("5000000", 18));
    // await Vaulat.setMaxWithdrawAmount("0x000ae314e2a2172a039b26378814c252734f556a", parseUnits("5000000", 18));
    // await Vaulat.setMaxWithdrawAmount("0x0a43fc31a73013089df59194872ecae4cae14444", parseUnits("5000000", 18));
    // await Vaulat.setMaxWithdrawAmount("0x47474747477b199288bf72a1d702f7fe0fb1deea", parseUnits("5000000", 18));
    // await await Vaulat.setMaxWithdrawAmount(HEST, parseUnits("5000000", 18));
    // console.log(await HashGameFactory.admin());
    // await await Vaulat.setWhiteTarget("0x094980F5b6B8C5B575187Cc86E82ed6EC0eFA135", true);
    // await await Vaulat.setSupportTokens(HEST, true);
    // await await Vaulat.setMaxWithdrawAmount(HEST, parseUnits("500000", 18));

    // await await HashGameFactory.setAdmin("0x7a7a75b1e39402dd3f524e48883061d530f7e0de");
    // 0x0065321aBF22a6375472C76eA97A9506a5eac193
    // const HashIDO = await ethers.getContractAt("HashIDO", "0x9Cc56378a698c7b4DB985337eFfa69b04720796d", owner);
    // const HashGame = await ethers.getContractAt("HashGame", Game, mgr);
    // const HashGame2 = await ethers.getContractAt("HashGame", Game2, mgr);
    // await Vaulat.setMaxWithdrawAmount(usdt, parseUnits("10000", 18));
    // console.log(await Vaulat.owner());
    // console.log(await Vaulat.factory());
    // 0x546a414dac0cd7c82df9a7c692f7a37d615d4366
    // console.log(await Vaulat.manager());
    // 0x3fc504106bfa242ca9f2147f414b9f1ecaef8484
    // console.log(await Vaulat.admin());
    // await await Vaulat.setAdmin("0x3fc504106bfa242ca9f2147f414b9f1ecaef8484");
    // 0xdd7dcc68575d8acfcb93db33f21c80f04075e063
    // console.log(await HashGameFactory.admin());
    // await await Vaulat.setWhiteTarget("0x0065321aBF22a6375472C76eA97A9506a5eac193", false);
    // await await Vaulat.setWhiteTarget("0x9Cc56378a698c7b4DB985337eFfa69b04720796d", true);
    // console.log(await HashIDO.RECEIVE());
    // console.log(await HashIDO.LEADER());
    // console.log(await HashIDO.MARKET());
    // console.log(await HashIDO.vaulat());
    // await await HashIDO.setWhitelist(
    //   [
    //     "0x15d1C801B97883a1dD1bfA860458758DFD182331",
    //     "0xdE55F3d0d0641927958a67BaA37bD4a9B08cFCC9",
    //     "0x665447277f3a8e8f295aff6777a5abbd1810c76a",
    //     "0x0f64615e893C50Aa95DE4251E1cCd2f140Be6CBb",
    //     "0x915ca86af8536Bb20684Df2c2F6b47FB71A7f561",
    //     "0x24cca3f02020a4123835E874DaFa0B744f5D46f6",
    //     "0xe625e3390db80e4b0b69c68628cbe52835f78db9",
    //     "0x5441d642f94Abcfffb7fCa13e458bC288A6EFD61",
    //     "0x2Fd5a6402Fd763E0670e7c814C02D3E088912C9d",
    //     "0x4dd491CD0680e69348019A7cb7B8E4328b896f40",
    //   ],
    //   [
    //     parseUnits("40000", 18),
    //     parseUnits("38000", 18),
    //     parseUnits("25000", 18),
    //     parseUnits("11000", 18),
    //     parseUnits("58000", 18),
    //     parseUnits("20000", 18),
    //     parseUnits("25000", 18),
    //     parseUnits("1000", 18),
    //     parseUnits("45000", 18),
    //     parseUnits("2700", 18),
    //   ],
    // );
    // await await HashIDO.setStageRemaining(0, parseUnits("154300", 18));
    // console.log(await HashIDO.isActive());
    // console.log(await Vaulat.whiteTarget("0x9Cc56378a698c7b4DB985337eFfa69b04720796d"));

    // await Vaulat.setAdmin("0xdD107Da03a4AC10914ebA256F8EAA32fC735003A");
    // console.log(await Vaulat.maxWithdrawAmount(usdt));
    // await await Vaulat.setStakeTokens(USDC, true);
    // console.log(await Vaulat.stakeTokens(USDC));
    // console.log(await Vaulat.stakeTokens(USDT));
    // console.log(await Vaulat.minStakeAmt(USDT));

    // await await Vaulat.setManager("0x546a414dac0cd7c82df9a7c692f7a37d615d4366");
    // await await Vaulat.setMaxWithdrawAmount(USDT, parseUnits("10000", 18));
    // await await Vaulat.setMaxWithdrawAmount(USDC, parseUnits("10000", 18));
    // await await Vaulat.setMinStakeAmount(USDC, parseUnits("10", 18));
    // await await Vaulat.setMinStakeAmount(USDT, parseUnits("10", 18));
    // console.log(await Vaulat.POOL());
    // await HashGameFactory.setAdmin(owner.address);
    // console.log(await HashGameFactory.getGame(10010101));

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

    // await await HashGameFactory.createGame(
    //   "10010105",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );

    // await await HashGameFactory.createGame(
    //   "10010107",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010108",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010109",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDC],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010110",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010111",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010112",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010113",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010114",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010115",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010116",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010117",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010118",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );
    // await await HashGameFactory.createGame(
    //   "10010119",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   ZeroAddress,
    //   [USDT],
    //   [],
    //   [],
    // );

    // await await HashGameFactory.createGame(
    //   "10020100",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   "0xc2183cbeff919107e7b441ce786139e4bd06de25",
    //   [USDT, USDC],
    //   [],
    //   [],
    // );

    // await await HashGameFactory.createGame(
    //   "10020700",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   "0xa7085789c6f3432fa422d415b8bed83f82e55b8b",
    //   [USDT, USDC],
    //   [],
    //   [],
    // );

    // await await HashGameFactory.createGame(
    //   "10021200",
    //   "0xb3b4c1c6463eceb701f8e73398c7cd54d819f6c3",
    //   "0xAA22cDb6d0bC7F394aFd0115dEA708daec867a51",
    //   [USDT, USDC],
    //   [],
    //   [],
    // );

    // console.log(await HashGameFactory.getGame("10021200"));
    // await await Vaulat.refoundGameAssets("10020100");
    // await await Vaulat.refoundGameAssets("10020700");
    // await HashGame.settle(0, [0], [parseUnits("1", 18)]);
    // await HashGame2.settle(0, [0], [parseUnits("0.0001", 18)]);

    // console.log(await HashGame2.accounts(0));
    // console.log(await HashGame2.rates(0));
  } catch (e) {
    console.log(e);
  }
});
