import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ZeroAddress } from "ethers";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { deployLockFixture } from "./Lock.fixture";

describe("HashGameFactory", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("Deployment", function () {
    beforeEach(async function () {
      const { HashGameFactory, lock_address } = await this.loadFixture(deployLockFixture);
      this.HashGameFactory = HashGameFactory;
      this.lock_address = lock_address;
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      await this.HashGameFactory.createGame(
        1,
        this.signers.admin.address,
        ZeroAddress,
        [ZeroAddress],
        [this.signers.admin.address],
        [50],
      );
      console.log(await this.HashGameFactory.getGame(1));
    });
  });
});
