import { useGameData } from "@/hooks";
import { map } from "lodash";
import { useEffect, useMemo, useState } from "react";

import ArrowLeftIcon from "../icons/ArrowLeft";
import { Col, Row } from "antd";
import "./index.less";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAppStore from "@/store/user";
import { gameBankerRecord } from "@/api";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Spin from "../spin";

import { useBankerData } from "@/hooks/banker";
import dayjs from "dayjs";
import TokenList from "./tokens";

export default function HostingListModal({ onClose }: { onClose: () => void }) {
  const { data: config = {} } = useGameData();
  const { gameId, token } = useAppStore();
  const [coin, setCoin] = useState<any>({});
  const { t } = useTranslation();
  const { play } = useSound();
  const { data: bankerData } = useBankerData(coin?.assetType);

  useEffect(() => {
    if (config?.assetConfig) {
      setCoin(config?.assetConfig?.[0]);
    }
  }, [config?.assetConfig]);

  const { hasNextPage, fetchNextPage, data, error, isLoading } =
    useInfiniteQuery({
      queryKey: ["game-banker-records", coin, gameId],
      initialPageParam: 1,
      enabled: !!token && !!gameId,
      getNextPageParam: (lastPage: any, pages) => {
        if (lastPage?.record?.length !== 20) {
          return undefined;
        }
        return pages.length + 1;
      },
      queryFn: async ({ pageParam }) => {
        const res = await gameBankerRecord({
          gameId,
          bettAsset: coin?.assetType,
          page: pageParam,
          pageSize: 20,
        });
        if (res.code === "0000") {
          return res.data;
        }
        return null;
      },
      retryDelay: 3000,
    });
  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: Boolean(error),
    rootMargin: "0px 0px 40px 0px",
  });

  const dataList = useMemo(() => {
    let _arr: Array<any> = [];
    data?.pages.forEach((page) => {
      _arr = _arr.concat(page?.record ?? []);
    });
    return _arr;
  }, [data]);

  return (
    <div className="verify bg-[var(--vt-c-black-65)]">
      <div className="main-box pt-76px">
        <div className="flex items-center justify-between">
          <div
            className="font-bold text-24px flex items-center gap-16px cursor-pointer"
            onClick={() => {
              onClose?.();
              play(0);
            }}
          >
            <ArrowLeftIcon className="w-32px h-32px md:w-24px md:h-24px" /> {t("My Banker Details")}
          </div>
          <div className="flex gap-33px">
            <div className="flex gap-15px">
              {/* {map(config?.assetConfig, (item, key) => (
                <div
                  key={key}
                  className={`token-item ${
                    coin?.assetType == item.assetType ? "active" : ""
                  }`}
                  onClick={() => {
                    setCoin(item);
                    play(0);
                  }}
                >
                  {item.tokenSymbol}
                </div>
              ))} */}
              <TokenList
                list={config?.assetConfig}
                selected={coin}
                onChange={setCoin}
              ></TokenList>
            </div>

            {/* <Select v-model="model" class="w-135px h-32px color-#fff text-center">
              <Option v-for="item in List" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> */}
          </div>
        </div>
        <div className="host-top mb-37px">
          <div className="flex">
            <div className="flex-1">
              <div className="text-14px mb-7px">
                {t("Current Banker Funds")}
              </div>
              <div className="text-20px font-bold">
                {bankerData?.bankerUserBalance}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-14px mb-7px">
                {t("Initial Banker Funds")}
              </div>
              <div className="text-20px font-bold">
                {bankerData?.bankerUserAmount}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-14px mb-7px">{t("Profit")}</div>
              <div className="text-20px font-bold">
                {bankerData?.bankerUserIncome}
              </div>
            </div>
            {/* <div className="flex-1">
              <div className="text-14px mb-7px">{t("APY")}</div>
              <div className="text-20px font-bold">0.00%</div>
            </div> */}
          </div>
        </div>
        <div className="ver-box">
          <Row className="mb-13px">
            <Col span={4}>
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Time")}
              </div>
            </Col>
            {/* <Col span="4">
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Round")}
              </div>
            </Col> */}
            {/* <Col span="4">
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Direction")}
              </div>
            </Col> */}
            <Col span="4">
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Amount")}
              </div>
            </Col>
            <Col span="4">
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Balance")}
              </div>
            </Col>
            <Col span="4">
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Withdraw")}
              </div>
            </Col>
            <Col span="6">
              <div className="text-14px color-[var(--vt-c-white-65)]">
                {t("Hash")}
              </div>
            </Col>
            <Col span="2">
              <div className="text-14px color-[var(--vt-c-white-65)] text-right">
                {t("Status")}
              </div>
            </Col>
          </Row>
          <OverlayScrollbarsComponent
            style={{ width: "100%", height: "100%" }}
            className="box-border pr-12px "
            options={{
              scrollbars: { theme: "os-theme-dark", visibility: "auto" },
              overflow: { x: "hidden", y: "scroll" },
              paddingAbsolute: true,
            }}
          >
            {map(dataList, (item, key) => (
              <Row className="mb-10px" key={key}>
                <Col span="4">
                  <div className="text-14px">
                    {dayjs(item.orderTime * 1000).format("YYYY.MM.DD HH:mm")}
                  </div>
                </Col>
                {/* <Col span="4">
                  <div className="text-14px">#{item.}</div>
                </Col> */}
                <Col span="4">
                  <div className="text-14px">{item.bankerAmount}</div>
                </Col>
                <Col span="4">
                  <div className="text-14px">{item.bankerBalance}</div>
                </Col>
                <Col span="4">
                  <div className="text-14px">{item.refundAmount}</div>
                </Col>
                <Col span="6">
                  <div className="text-14px">
                    {" "}
                    {item.payTradeHash?.substring(0, 6) +
                      "****" +
                      item.payTradeHash?.substring(
                        item.payTradeHash.length - 20
                      )}
                  </div>
                </Col>
                <Col span="2">
                  <div className="text-14px text-right">
                    {t(
                      item.status === 1
                        ? "Banking"
                        : item.status === 2
                        ? "Withdrawn"
                        : "Redeemed"
                    )}
                  </div>
                </Col>
              </Row>
            ))}

            {hasNextPage && (
              <div
                className="flex items-center justify-center gap-5px text-16px"
                ref={infiniteRef}
              >
                <Spin></Spin> {t("Loading...")}
              </div>
            )}
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </div>
  );
}
