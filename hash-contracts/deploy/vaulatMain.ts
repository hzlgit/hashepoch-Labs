import { ZeroAddress } from "ethers";
import { upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const manager = "0xdd107da03a4ac10914eba256f8eaa32fc735003a";
const factory = "0x994bB72d1e0b033535CFc1E9A6D7bC46A11B421b";
const vaulat = "0xbbFd4Cd8652C7E868dAaA77437BF6f6f6a5b559d";
const USDT = "0x55d398326f99059fF775485246999027B3197955";
const USDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const [signer] = await hre.ethers.getSigners();

  const HashVaulat = await hre.ethers.getContractFactory("HashVaulat", signer);
  console.log(deployer);
  // const Vaulat = await upgrades.deployProxy(
  //   HashVaulat,
  //   [manager, deployer, "0xff75B6da14FfbbfD355Daf7a2731456b3562Ba6D"],
  //   {
  //     initializer: "initialize",
  //   },
  // );
  const Vaulat = await upgrades.upgradeProxy(vaulat, HashVaulat, {});
  await Vaulat.waitForDeployment();
  // await Vaulat.waitForDeployment();
  const vaulat_Address = await Vaulat.getAddress();

  console.log(`HashVaulat contract: `, vaulat);

  const factory = await deploy("HashGameFactory", {
    from: deployer,
    args: [vaulat_Address, deployer, deployer],
    proxy: false,
    log: true,
  });

  // const tx2 = await Vaulat.setAdmin(manager);
  // await tx2.wait();
  await await Vaulat.setFactory(factory.address);
  // await await Vaulat.setSupportTokens(USDT, true);
  // await await Vaulat.setSupportTokens(USDC, true);
  // await await Vaulat.setStakeTokens(USDT, true);
};
export default func;
func.id = "deploy_vaulat";
func.tags = ["Vaulat_Main"];
