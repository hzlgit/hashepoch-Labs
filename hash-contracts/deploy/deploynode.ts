import { parseUnits } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // const NodeDeploy = await deploy("HashNode", {
  //   from: deployer,
  //   args: ["0x14a51D43e8415D24605A0f2fC75E82FDa04A2a56", "0xF9984Bd2aD459ab164d4571B12339601934f4054", 2999, 0],
  //   log: true,
  // });
  // test net
  const NodeDeploy = await deploy("HashNode", {
    from: deployer,
    args: ["0xdd107da03a4ac10914eba256f8eaa32fc735003a", deployer, 2999, 0],
    log: true,
  });

  const Node = await hre.ethers.getContractAt("HashNode", NodeDeploy.address);
  // console.log(await await Node.)
  // console.log(await WLFI1.balanceOf(deployer));
  // console.log(await WLFI1.decimals());

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
func.id = "deploy_node"; // id required to prevent reexecution
func.tags = ["node"];
