import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const HestConfig = await deploy("HestConfig1", {
    from: deployer,
    args: [],
    log: true,
  });
  const HEST = await deploy("HEST1", {
    from: deployer,
    args: [HestConfig.address],
    log: true,
  });

  const HestConf = await hre.ethers.getContractAt("HestConfig1", HestConfig.address);
  // await await HestConf.setHEST(HEST.address);
  // await await HestConf.setFee(50, 50);
  await await HestConf.setFirstCount(3);
  // await await HestConf.setWhites(["0x7a7a75B1E39402dd3f524e48883061d530F7e0DE"], true);
  console.log(`HEST contract: `, HEST.address);
  console.log(await HestConf.isLock());
  console.log(await HestConf.getFee());
};
export default func;
func.id = "deploy_HEST"; // id required to prevent reexecution
func.tags = ["HEST1"];
