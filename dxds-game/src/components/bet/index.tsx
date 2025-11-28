import { map } from "lodash";
import "./index.less";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAppStore from "@/store/user";
import { gameRecord } from "@/api";
import dayjs from "dayjs";
import numeral from "numeral";
import Spin from "../spin";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";
import TokenList from "./tokens";
const BetRecord = ({ coins }: { coins: Array<any> }, ref: any) => {
  const [coin, setCoin] = useState<any>();
  const { token, gameId } = useAppStore();
  const { t } = useTranslation();

  const { hasNextPage, fetchNextPage, data, error, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["game-record-list", coin?.assetType, gameId],
      initialPageParam: 1,
      enabled: !!token && !!gameId,
      getNextPageParam: (lastPage: any, pages) => {
        if (lastPage?.record?.length !== 20) {
          return undefined;
        }
        return pages.length + 1;
      },
      queryFn: async ({ pageParam }) => {
        const res = await gameRecord({
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

  const getResult = (item: any) => {
    if (item?.status === 0) return t("To Pay");
    if (item?.status === 1) {
      if (item?.bettResult === 0) {
        return t("Waiting");
      }
      if (item?.bettResult === 1) {
        return t("Win");
      }
      if (item?.bettResult === 2) {
        return t("No Win");
      }
    }
    if (item.status === 2) return t("Invalid");
  };

  useImperativeHandle(ref, () => ({
    refetch,
  }));
  const { play } = useSound();

  return (
    <>
      <div className="pt-12px pl-21px pr-19px">
        <div className="flex justify-between items-center font-bold">
          <div className="w-100% flex items-center justify-between">
            <div className="text-20px color-#2A2A2A mr-21px">
              {t("My Betting Records")}
            </div>

            <div className="flex items-center">
              <div
                className={`bet-coin-item ${!coin ? "selected" : ""}`}
                onClick={() => {
                  setCoin(undefined);
                  play(0);
                }}
              >
                {t("All")}
              </div>
              <TokenList
                list={coins}
                selected={coin}
                onChange={setCoin}
              ></TokenList>
            </div>
            {/* {map(coins, (item, idx) => (
              <div
                className={`bet-coin-item ${
                  item.assetType === coin ? "selected" : ""
                }`}
                key={idx}
                onClick={() => {
                  play(0);
                  setCoin(item.assetType);
                }}
              >
                {item.tokenSymbol}
              </div>
            ))} */}
          </div>
          {/* <div className="text-16px color-#2A2A2A cursor-pointer">更多</div> */}
        </div>
        <div className="pl-20px pr-8px mt-20px h-230px">
          <OverlayScrollbarsComponent
            style={{ width: "100%", height: "100%" }}
            className="box-border pr-12px "
            options={{
              scrollbars: { theme: "os-theme-dark", visibility: "auto" },
              overflow: { x: "hidden", y: "scroll" },
              paddingAbsolute: true,
            }}
          >
            {map(dataList, (item, idx) => (
              <div key={idx} className="mb-10px flex">
                <div className="w-18%">
                  <div className="text-16px">
                    {dayjs(item.orderTime * 1000).format("MM.DD HH:mm:ss")}
                  </div>
                </div>
                <div className="w-14%">
                  <div className="text-16px uppercase">#{item.gamePeriod}</div>
                </div>
                <div className="w-20%">
                  <div className="text-16px">
                    {numeral(item.bettAmount).format("0,0.00a")}{" "}
                    {item.bettAsset}
                  </div>
                </div>
                <div className="w-10%">
                  {item.bettType == 1 ? (
                    <div className="text-16px color-[var(--vt-c-main4)]">
                      【{t(item.bettModel === 1 ? "Big" : "Odd")}】
                    </div>
                  ) : (
                    <div className="text-16px color-[var(--vt-c-main2)]">
                      【{t(item.bettModel === 1 ? "Small" : "Even")}】
                    </div>
                  )}
                </div>
                <div className="w-10%">
                  <div className="text-16px">
                    {item.payType == 2 ? t("Account") : t("Wallet")}
                  </div>
                </div>
                <div className="w-20%">
                  <div className="text-16px uppercase">
                    {numeral(item.bettAwardAmount).format("0,0.00a")}
                  </div>
                </div>
                <div className="w-8%">
                  <div className="text-16px text-right">{getResult(item)}</div>
                </div>
              </div>
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
    </>
  );
};

export default forwardRef(BetRecord);
