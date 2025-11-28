import request from "@/utils/request";

/**
 * 登录
 */

export function doLogin({
  gameId,
  signature,
}: {
  gameId: string;
  signature: string;
}) {
  return request({
    url: "/api/app/user/game/login",
    data: {
      gameId,
      gameData: signature,
    },
    withCredentials: false,
  });
}

export function userInfo() {
  return request({
    url: "/api/app/user/info",

    data: {},
  });
}
export function gameData(gameId: string) {
  return request({
    url: "/api/app/game/config/query",
    data: {
      gameId,
    },
  });
}
export function gameDrawData(gameId: string) {
  return request({
    url: "/api/app/game/draw/data",
    data: {
      gameId,
    },
  });
}
export function gameCurrentData(
  gameId: string,
  bettModel: string,
  bettAsset: string
) {
  return request({
    url: "/api/app/game/data/query",
    data: {
      gameId,
      bettModel,
      bettAsset,
    },
  });
}

export function gameUserData(
  gameId: string,
  gamePeriod: string,
  bettModel: string,
  bettAsset: string
) {
  return request({
    url: "/api/app/game/user/data",
    data: {
      gameId,
      bettModel,
      bettAsset,
      gamePeriod: gamePeriod || "0",
    },
  });
}
export function gameBett({
  gameId,
  gamePeriod,
  bettModel,
  bettType,
  bettAsset,
  payType,
  amount,
}: {
  gameId: string;
  gamePeriod: string;
  bettModel: string;
  bettType: string;
  bettAsset: string;
  payType: string;
  amount: string;
}) {
  return request({
    url: "/api/app/game/bett",
    data: {
      gameId,
      gamePeriod,
      bettModel,
      bettType,
      bettAsset,
      payType,
      amount,
    },
  });
}

export function gameBettResult(gameId: string, gamePeriod: string) {
  return request({
    url: "/api/app/game/bett/result/query",
    data: {
      gameId,
      gamePeriod,
    },
  });
}
export function gameBettAward(
  gameId: string,
  gamePeriod: string,
  bettAsset: string
) {
  return request({
    url: "/api/app/game/bett/award/query",
    data: {
      gameId,
      gamePeriod,
      bettAsset,
    },
  });
}
export function gameRecord({
  gameId,
  bettAsset,
  page = 1,
  pageSize = 20,
  sortName,
  sortType,
}: {
  gameId: string;
  page: number;
  pageSize?: number;
  sortName?: string;
  sortType?: string;
  bettAsset: string;
}) {
  return request({
    url: "/api/app/game/bett/record/query",
    data: {
      gameId,
      page,
      pageSize,
      sortName,
      sortType,
      bettAsset,
    },
  });
}

export function gamePeriod({
  gameId,
  page = 1,
  pageSize = 20,
  sortName,
  sortType,
}: {
  gameId: string;
  page: number;
  pageSize?: number;
  sortName?: string;
  sortType?: string;
}) {
  return request({
    url: "/api/app/game/period/query",
    data: {
      gameId,
      page,
      pageSize,
      sortName,
      sortType,
    },
  });
}

export function gameBankerData(
  gameId: string,

  bettAsset: string
) {
  return request({
    url: "/api/app/game/banker/data",
    data: {
      gameId,

      bettAsset,
    },
  });
}

export function gameBankerBet(
  gameId: string,
  bettAsset: string,
  amount: string
) {
  return request({
    url: "/api/app/game/banker/bett",
    data: {
      gameId,
      amount,
      bettAsset,
    },
  });
}
export function gameBankerRecord({
  gameId,
  bettAsset,
  page = 1,
  pageSize = 20,
  sortName,
  sortType,
}: {
  gameId: string;
  page: number;
  pageSize?: number;
  sortName?: string;
  sortType?: string;
  bettAsset: string;
}) {
  return request({
    url: "/api/app/game/banker/record/query",
    data: {
      gameId,
      page,
      pageSize,
      sortName,
      sortType,
      bettAsset,
    },
  });
}
export function gameVerifyRecord({
  gameId,
  blockNumber,
  page = 1,
  pageSize = 20,
  sortName,
  sortType,
}: {
  gameId: string;
  page: number;
  pageSize?: number;
  sortName?: string;
  sortType?: string;
  blockNumber: string;
}) {
  return request({
    url: "/api/app/game/trade/record/query",
    data: {
      gameId,
      page,
      pageSize,
      sortName,
      sortType,
      blockNumber,
    },
  });
}
