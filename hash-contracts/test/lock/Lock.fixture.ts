import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ZeroAddress } from "ethers";
import { ethers } from "hardhat";

import { HashGame, HashGameFactory, HashGameFactory__factory } from "../../types";

export async function deployLockFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const Lock = (await ethers.getContractFactory("HashGameFactory")) as HashGameFactory__factory;
  const HashGameFactory = (await Lock.deploy(ZeroAddress, owner, owner)) as HashGameFactory;
  const lock_address = await HashGameFactory.getAddress();

  return { HashGameFactory, lock_address };
}
