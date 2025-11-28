import { parseUnits } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // const FIST = await deploy("MockUSD", {
  //   from: deployer,
  //   args: ["FIST", "FIST", 6],
  //   log: true,
  // });

  // const BARS = await deploy("MockUSD", {
  //   from: deployer,
  //   args: ["币安人生", "币安人生", 18],
  //   log: true,
  // });
  // const ASTER = await deploy("MockUSD", {
  //   from: deployer,
  //   args: ["ASTER", "ASTER", 18],
  //   log: true,
  // });
  // const ERC204 = await deploy("MockUSD", {
  //   from: deployer,
  //   args: ["4", "4", 18],
  //   log: true,
  // });
  // const WLFI = await deploy("MockUSD", {
  //   from: deployer,
  //   args: ["WLFI", "WLFI", 18],
  //   log: true,
  // });

  const WLFI1 = await hre.ethers.getContractAt("MockUSD", "0x1b73ce8526D03C4f80fab41E8348Ea1704632AE0");

  const FIST = await hre.ethers.getContractAt("MockUSD", "0x3ec7E75110c35FE1fbd6F5eF881Adb3a51B682A0");
  const ERC204 = await hre.ethers.getContractAt("MockUSD", "0xdA125b626258b3055D26c8D83131aACDF916e70b");
  const ASTER = await hre.ethers.getContractAt("MockUSD", "0xf8FE2f215FfD0f987fa989477C7fAbb579497Bd0");
  const BARS = await hre.ethers.getContractAt("MockUSD", "0x4AbF754556d587d2bfd23BBC8e4F3A4e3a1B3BC3");
  // console.log(await WLFI1.balanceOf(deployer));
  // console.log(await WLFI1.decimals());

  await await FIST.transfer("0x75881b06c6caa6b82c51788b3138ce4ec1087bb3", parseUnits("100000", 6));
  await await ERC204.transfer("0x75881b06c6caa6b82c51788b3138ce4ec1087bb3", parseUnits("100000", 18));
  await await ASTER.transfer("0x75881b06c6caa6b82c51788b3138ce4ec1087bb3", parseUnits("100000", 18));
  await await WLFI1.transfer("0x75881b06c6caa6b82c51788b3138ce4ec1087bb3", parseUnits("100000", 18));
  await await BARS.transfer("0x75881b06c6caa6b82c51788b3138ce4ec1087bb3", parseUnits("100000", 18));
  // await await HestConf.setHEST(HEST.address);
  // await await HestConf.setFee(50, 50);
  // await await HestConf.setFirstCount(3);
  // await await HestConf.setWhites(["0x7a7a75B1E39402dd3f524e48883061d530F7e0DE"], true);
  // console.log(`HEST contract: `, HEST.address);
  // console.log(await HestConf.isLock());
  // console.log(await HestConf.getFee());

  console.log(deployer);
};
export default func;
func.id = "deploy_erc20"; // id required to prevent reexecution
func.tags = ["erc20"];
