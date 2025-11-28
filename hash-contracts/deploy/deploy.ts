import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const HestConfig = await deploy("HestConfig", {
    from: deployer,
    args: [],
    log: true,
  });
  const HEST = await deploy("HEST", {
    from: deployer,
    args: [HestConfig.address],
    log: true,
  });
  const ERC20Tool = await deploy("ERC20Tool", {
    from: deployer,
    args: [],
    log: true,
  });
  // const HestConf = await hre.ethers.getContractAt("HestConfig", HestConfig.address);
  // await await HestConf.setHEST(HEST.address);
  // await HestConf.setWhites([""],true);
  // await HestConf.setLocked(true);
  // await await HestConf.setWhites(
  //   [
  //     "0xada653DD3e20c982D9564a90D7bac02561D33869",
  //     "0xa09cc5ef1972169bf7f107d52eb94a9b0d747099",
  //     "0x517738c120d8444c3f4d57f9b6217db8deb7ba47",
  //     "0xd61c3f469b06e7a7171770b276a0489ae36c14da",
  //     "0x073bcf8b3da58872b252d80e6b1643ce79bf9e3f",
  //     "0xbb07356c1e0cbdc493ee928b24211bad64c99d33",
  //     "0x7FaFD9069A8Eb341066E46599Cb67eFDD73F8820",
  //     "0xd23fddea439ebd50164f2a38aaae04d7a09d7447",
  //     "0x96AF9282c42570f4Afe22bEF4ea2F9F88a53B830",
  //   ],
  //   true,
  // );
  // await await HestConf.transferOwnership("0x2f5e7368a08c698cc27d4edbf5f6061705051f2c");
  console.log(`HEST contract: `, HEST.address);
};
export default func;
func.id = "deploy_HEST"; // id required to prevent reexecution
func.tags = ["HEST"];
