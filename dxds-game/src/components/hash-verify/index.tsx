import useTranslation from "@/locale";
import CopyText from "../copy-button";
import ArrowLeftIcon from "../icons/ArrowLeft";
import SearchIcon from "../icons/IconSearch";
import "./index.less";
import useSound from "@/hooks/useSound";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { gameVerifyRecord } from "@/api";
import useAppStore from "@/store/user";
import dayjs from "dayjs";
import { filter, findIndex, map } from "lodash";
import numeral from "numeral";
import useDebounce from "@/hooks/useDebounce";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Spin from "../spin";
import { formatAccount } from "@/utils";

export default function VerifyModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { play } = useSound();
  const { gameId } = useAppStore();
  const [blockNumber, setblockNumber] = useState("");

  const blockHeight = useDebounce(blockNumber, 500);

  const fetchList = async ({ pageParam }: any) => {
    const res = await gameVerifyRecord({
      page: pageParam,
      pageSize: 20,
      gameId,
      blockNumber: blockHeight,
    });
    if (res.code === "0000") {
      return res.data;
    }
    return null;
  };
  const { hasNextPage, fetchNextPage, data, error, isLoading } =
    useInfiniteQuery({
      queryKey: ["game-banker-records", blockHeight, gameId],
      initialPageParam: 1,
      enabled: !!gameId,
      getNextPageParam: (lastPage: any, pages) => {
        if (lastPage?.record?.length !== 20) {
          return undefined;
        }
        return pages.length + 1;
      },
      queryFn: fetchList,
      retryDelay: 5000,
    });
  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: Boolean(error),
    rootMargin: "0px 0px 40px 0px",
  });

  const { data: firstPageData } = useQuery({
    queryKey: ["hash-game-chain-record-list", gameId, { pageParam: 1 }], // 与无限查询的子键匹配
    queryFn: () => fetchList({ pageParam: 1 }),
    refetchInterval: 5000,
  });

  const dataList = useMemo(() => {
    let _arr: Array<any> = [];
    data?.pages.forEach((page) => {
      _arr = _arr.concat(page?.record ?? []);
    });

    return [
      ...filter(
        firstPageData?.record,
        (r) => findIndex(_arr, (a) => a.serialNo === r.serialNo) < 0
      ),
      ..._arr,
    ];
  }, [data, firstPageData]);

  const tradeType = useCallback(
    (tradeType: string | number) => {
      switch (Number(tradeType)) {
        case 1:
          return {
            text: t("In"),
            color: "#FFBC00",
          };
        case 2:
          return {
            text: t("Out"),
            color: "#00AEFF",
          };
        case 3:
          return {
            text: t("Draw"),
            color: "#FE00FF",
          };
        default:
          return {
            text: "",
          };
      }
    },
    [t]
  );

  const tradeSubType = useCallback(
    (tradeSubType: string) => {
      switch (tradeSubType) {
        case "BETT":
          return t("User Bet");
        case "BETT2":
          return t("Platform Deposit");
        case "GUARANTEE":
          return t("Project Guarantee");
        case "USER_ALLOT":
          return t("User");
        case "PROJECT_ALLOT":
          return t("Project Return");
        case "PLATFORM_ALLOT":
          return t("Platform");
        case "ETH":
          return t("ETH");
        default:
          return "";
      }
    },
    [t]
  );

  return (
    <div className="verify bg-[var(--vt-c-black-65)]">
      <div className="main-box pt-76px">
        <div className="flex items-center justify-between">
          <div
            className="font-bold text-24px flex items-center gap-16px cursor-pointer"
            onClick={() => {
              onClose();
              play(0);
            }}
          >
            <ArrowLeftIcon className="w-24px h-24px" />{" "}
            {t("Game Verification Ledger")}
          </div>
          <div className="search-input w-274px">
            <div className="search-content">
              <span className="sufx">#</span>
              <input
                v-model="searchVal"
                value={blockNumber}
                onChange={(v) => setblockNumber(v.target.value)}
              />
            </div>
            <div className="search">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="ver-box">
          <OverlayScrollbarsComponent
            style={{ width: "100%", height: "100%" }}
            className="box-border pr-12px "
            options={{
              scrollbars: { theme: "os-theme-dark", visibility: "auto" },
              overflow: { x: "hidden", y: "scroll" },
              paddingAbsolute: true,
            }}
          >
            {/* <div className="text-14px flex gap-16px">
              <div className="color-#00A4FF">{dayjs(Item.addTime)}</div>
              <div>
                <div className="flex items-center gap-16px mb-9px flex-wrap">
                  <div>{t("No.")}</div>
                  <div>#00000000</div>
                  <div>{t("Block Height")}</div>
                  <div>0000000000</div>
                  <div>{t("Hash")}</div>
                  <div>0x0000****000000000000</div>
                  <div>{t("Draw Info")}</div>
                  <div className="color-#00FFEF">[0] [BIG]</div>
                </div>
                <div className="flex items-center gap-16px mb-9px flex-wrap">
                  <div>{t("Total Bets")}</div>
                  <div>0.00 USDT</div>
                  <div>0.00 BNB</div>
                  <div>本期投注人数</div>
                  <div>0 人次</div>
                </div>
                <div className="flex items-center gap-16px mb-9px flex-wrap">
                  <div>本期返奖总额</div>
                  <div>0.00 USDT</div>
                  <div>0.00 BNB</div>
                  <div>哈希值</div>
                  <div className="flex items-center">
                    <span className="mr-7px">0x0000****000000</span>
                    <CopyText text="0x0000****000000" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-14px flex gap-16px">
              <div className="color-#FFDF00">0000.00.00</div>
              <div>
                <div className="flex items-center gap-16px mb-9px flex-wrap">
                  <div>期号</div>
                  <div>#00000000</div>
                  <div>池子调取</div>
                  <div>0.00 USDT</div>
                  <div>0.00 BNB</div>
                  <div className="color-#FFDF00">对手盘对冲</div>
                  <div>哈希值</div>
                  <div className="flex items-center">
                    <span className="mr-7px">0x0000****000000</span>
                    <CopyText text="0x0000****000000" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-14px flex gap-16px">
              <div>0000.00.00</div>
              <div>
                <div className="flex items-center gap-16px mb-9px flex-wrap">
                  <div>期号</div>
                  <div>#00000000</div>
                  <div>用户投注</div>
                  <div>0.00 USDT/BNB</div>
                  <div className="color-#00FFEF">[one]</div>
                  <div>哈希值</div>
                  <div className="flex items-center">
                    <span className="mr-7px">0x0000****000000</span>
                    <CopyText text="0x0000****000000" />
                  </div>
                </div>
              </div>
            </div> */}
            {map(dataList, (item) => (
              <div key={item.serialNo} className="text-14px flex gap-16px">
                <div>
                  {dayjs(item.addTime * 1000).format("YYYY.MM.DD HH:mm:ss")}
                </div>
                <div>
                  <div className="flex items-center gap-16px mb-9px flex-wrap">
                    <div style={{ color: tradeType(item.tradeType).color }}>
                      {tradeType(item.tradeType).text}
                    </div>
                    <span className="net">
                      {tradeSubType(item.tradeSubType)}
                    </span>
                    {item.tradeType === 3 && (
                      <span className="net">#{item.gamePeriod}</span>
                    )}
                    {item.tradeType === 1 && item.tradeSubType !== "BETT2" && (
                      <span className="address">
                        {formatAccount(item.address)}
                      </span>
                    )}
                    {item.tradeType !== 3 && (
                      <span className="net uppercase">
                        {t("Amount")} {numeral(item.amount).format("0,0.00a")}{" "}
                        {t(item.assetType)}
                      </span>
                    )}

                    {item.tradeType === 3 ? (
                      <>
                        <span>
                          {t("Block Height")}&emsp; {item.blockNumber}
                        </span>
                        <div>{t("Hash")}</div>
                        <span className="mr-7px">
                          {item.blockHash?.substring(0, 6) +
                            "****" +
                            item.blockHash?.substring(
                              item.blockHash.length - 30
                            )}
                        </span>
                        <CopyText text={item.blockHash} />
                      </>
                    ) : (
                      <>
                        <div>{t("Hash")}</div>
                        <div className="flex items-center">
                          <span className="mr-7px">
                            {item.tradeHash?.substring(0, 6) +
                              "****" +
                              item.tradeHash?.substring(
                                item.tradeHash.length - 30
                              )}
                          </span>
                          <CopyText text={item.tradeHash} />
                        </div>
                      </>
                    )}
                  </div>
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
    </div>
  );
}
