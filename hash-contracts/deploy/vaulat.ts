import { ZeroAddress } from "ethers";
import { upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const manager = "0xdd107da03a4ac10914eba256f8eaa32fc735003a";
const factory = "0x6acCF37e002d55ECB6C59347D36df8f6871A548F";
const vaulat = "0x714870047CAD91bdC8308Eb193Dc2B035d0453c9";
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const [signer] = await hre.ethers.getSigners();
  const usdt = await deploy("MockUSD", {
    from: deployer,
    args: [],
    log: true,
  });

  const HashVaulat = await hre.ethers.getContractFactory("HashVaulat", signer);
  console.log(deployer);
  const Vaulat = await upgrades.upgradeProxy(vaulat, HashVaulat, {});
  await Vaulat.waitForDeployment();
  const vaulat_Address = await Vaulat.getAddress();

  console.log(`HashVaulat contract: `, vaulat);

  const factory = await deploy("HashGameFactory", {
    from: deployer,
    args: [vaulat, deployer, manager],
    proxy: false,
    log: true,
  });

  const tx2 = await Vaulat.setAdmin(manager);
  await tx2.wait();
  await Vaulat.setFactory(factory.address);
};
export default func;
func.id = "deploy_vaulat";
func.tags = ["Vaulat"];
