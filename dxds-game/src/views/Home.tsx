import "./index.less";
import {
  useGameCurrentData,
  useGameData,
  useGameDrawData,
  useGameUserData,
} from "@/hooks";
import TokenList from "@/components/token-list";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Marker from "@/components/marker";
import Header from "@/components/header";
import UserInfo from "@/components/user-info";
import GameRecord from "@/components/record";
import BetRecord from "@/components/bet";
import WinResult from "@/components/win-result";
import SizeSwitch from "@/components/size-switch";
import CountDown from "@/components/countdown";
import AmountSet from "@/components/amount-set";
import AccountSet from "@/components/account-set";
import Confirm from "@/components/confirm";
import useAppStore from "@/store/user";
import useAppStateStore from "@/store/state";
import ResultModal from "@/components/result-modal";
import useSubmit from "@/hooks/useSubmit";

import { useBankerData } from "@/hooks/banker";
import useSound from "@/hooks/useSound";
import useTranslation from "@/locale";
import usePageVisibility from "@/hooks/usePageVisibility";
import useGameSdk from "@/hooks/useGameSdk";
import toast from "react-hot-toast";

export default function HomeView() {
  const { play } = useSound();
  const { t } = useTranslation();
  const {
    setCurrentPeriod,
    currentPeriod,
    previousPeriod,
    setPreviousPeriod,
    changeModalOpend,
    setOpenPeriod,
  } = useAppStateStore();
  const { data: config, refetch: refetchGameConfig } = useGameData();

  const [mode, setMode] = useState(1);
  const [size, setSize] = useState<number>();
  const [coin, setCoin] = useState<any>();
  const [amt, setAmt] = useState(0);
  const [amount, setAmount] = useState<string | number>("");
  const [payType, setPayType] = useState(2);
  const [time, setTime] = useState(0);
  const recordRef = useRef<any>(null);

  // const [isVisible, setIsVisible] = useState(true);

  const { isVisible } = usePageVisibility();

  const { token, loadEnd } = useAppStore();
  const [walletAsset, setWalletAsset] = useState<any>();

  const { sdk } = useGameSdk({ assetUpdate: setWalletAsset });

  const { data: drawData, refetch: refetchDrawData } = useGameDrawData();
  const { data: current, refetch: refetchGame } = useGameCurrentData(
    String(mode),
    coin?.assetType
  );
  const { data: userData, refetch: refetchUserData } = useGameUserData({
    gamePeriod: current?.currentPeriod?.periodNo,
    bettAsset: coin?.assetType,
    bettModel: String(mode),
  });

  const { data: bankerData } = useBankerData(coin?.assetType);

  useEffect(() => {
    if (config?.assetConfig?.length > 0 && !coin?.assetType) {
      setCoin(config?.assetConfig?.[0]);
    }
  }, [config, coin]);

  useEffect(() => {
    if (coin) {
      setAmt(coin.bettAmountConfig?.[0]);
      setAmount(coin.bettAmountConfig?.[0]);
    }
  }, [coin]);

  useEffect(() => {
    if (current?.previousPeriod?.periodNo) {
      if (previousPeriod?.periodNo !== current?.previousPeriod?.periodNo) {
        setPreviousPeriod(current?.previousPeriod);
        refetchUserData();
        refetchDrawData();
        refetchGameConfig();
        recordRef.current?.refetch();
      }
    }
  }, [
    current,
    previousPeriod,
    refetchUserData,
    setPreviousPeriod,
    refetchDrawData,
    refetchGameConfig,
  ]);

  useEffect(() => {
    if (current?.currentPeriod?.periodNo) {
      if (currentPeriod?.periodNo !== current?.currentPeriod?.periodNo) {
        setCurrentPeriod({
          ...current?.currentPeriod,
        });
      }
    }
  }, [current, currentPeriod, setCurrentPeriod]);

  useEffect(() => {
    if (current?.currentPeriod?.periodEndTime) {
      const timeSpace =
        current?.currentPeriod?.periodEndTime - current?.currentTime;
      if (time <= 0) {
        setTime(timeSpace > 0 ? timeSpace : 0);
      }
    }
  }, [
    current?.currentPeriod?.periodEndTime,
    current?.currentTime,
    time,
    isVisible,
  ]);

  const resetState = useCallback(async () => {
    const { data: _game } = await refetchGame();
    const timeSpace = _game?.currentPeriod?.periodEndTime - _game?.currentTime;
    setCurrentPeriod(_game?.currentPeriod);
    setTime(timeSpace > 0 ? timeSpace : 0);
  }, [refetchGame, setCurrentPeriod]);

  useEffect(() => {
    if (isVisible) {
      resetState();
    }
  }, [isVisible, resetState]);

  // useEffect(() => {
  //   sdk.current = new HashEpochSDK({
  //     targetWindow: window.parent,
  //     allowedOrigins: [
  //       "http://localhost:3000",
  //       "http://localhost:5173",
  //       "https://dapp.hashepoch.io",
  //       "https://dapp.hashepoch.net",
  //     ],
  //   });
  //   sdk.current.on("assetUpdate", (res: any) => {
  //     setWalletAsset(res);
  //   });
  //   // sdk.current.on("visible", (res: any) => {

  //   //   console.log("visible 监听");
  //   // });
  // }, []);

  const updateAsset = async () => {
    const res = await sdk.call("getAssets", {});
    setWalletAsset(res);
  };

  const balance = useMemo(() => {
    if (payType === 1) {
      return walletAsset?.[String(coin?.assetType).toLowerCase()] ?? 0;
    } else {
      return userData?.balanceAmount;
    }
  }, [userData?.balanceAmount, payType, walletAsset, coin]);

  const onChangeTime = () => {
    setTime((p) => {
      return p - 1;
    });
  };

  const { submit, loading } = useSubmit({
    sdk: sdk,
    onSuccess() {
      refetchGame();
      refetchUserData();
      recordRef.current?.refetch();
    },
  });

  const _confirm = async () => {
    if (token) {
      if (!size) {
        toast(t("Select Bet Option"));
        return;
      }
      submit({
        gamePeriod: current?.currentPeriod?.periodNo,
        bettAsset: coin?.assetType,
        bettModel: String(mode),
        payType: String(payType),
        amount: String(amount),
        bettType: String(size),
      });
    } else {
      const res = await sdk?.call("login", {});
      console.log(res);
    }
  };
  const timer = useRef<any>(null);

  useEffect(() => {
    if (currentPeriod?.periodNo && loadEnd) {
      if (time <= 1) {
        timer.current = setTimeout(() => {
          changeModalOpend(true);
          setOpenPeriod(currentPeriod?.periodNo);
        }, 800);
      }
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [time, currentPeriod?.periodNo, changeModalOpend, setOpenPeriod, loadEnd]);

  useEffect(() => {
    if (currentPeriod?.periodNo && loadEnd) {
      const timeSpace = currentPeriod?.periodEndTime - current?.currentTime;
      const isCurrent =
        current?.currentPeriod?.periodNo === currentPeriod?.periodNo;
      if (timeSpace <= 0 && isCurrent) {
        changeModalOpend(true);
        setOpenPeriod(currentPeriod?.periodNo);
      }
    }
  }, [
    currentPeriod?.periodNo,
    changeModalOpend,
    setOpenPeriod,
    loadEnd,
    current?.currentTime,
    current?.currentPeriod?.periodNo,
    currentPeriod?.periodEndTime,
  ]);

  return (
    <div
      className={`game-home-view mode${mode}-theme ${
        mode === 2 ? "mode2" : ""
      } ${loadEnd ? "visible-view" : ""}`}
    >
      <div className="main-box">
        <Header />
        <div className="flex flex-col">
          <div className="bg1 mb-24px">
            <img
              src="/images/main-bg1.png"
              alt=""
              className="w-851px h-255px absolute left-0 top-0 z-1 animate1"
            />
            <div className="bg1-head w-851px h-255px absolute left-0 top-0 z-2 flex justify-between">
              <div>
                <TokenList
                  list={config?.assetConfig ?? []}
                  selected={coin}
                  onChange={setCoin}
                />
                <Marker
                  symbol={coin?.assetType}
                  data={config}
                  bankerData={bankerData}
                />
              </div>
              <UserInfo data={userData} />
            </div>
          </div>
          <div className="bg3">
            <GameRecord data={drawData} mode={mode} />
            <BetRecord ref={recordRef} coins={config?.assetConfig ?? []} />
          </div>
        </div>
        <div className="bg2">
          <div className="w-100% flex justify-between mt-17px mb-51px">
            <div
              className={`style-btn style-btn1 ${mode === 1 ? "show" : ""}`}
              onClick={() => {
                setMode(1);
                setSize(undefined);
                play(4);
              }}
            >
              <div className="z-2 relative">{t("Big/Small Mode")}</div>
            </div>
            <div
              className={`style-btn style-btn2 ${mode === 2 ? "show" : ""}`}
              onClick={() => {
                setMode(2);
                play(4);
                setSize(undefined);
              }}
            >
              <div className="z-2 relative">{t("Odd/Even Mode")}</div>
            </div>
          </div>
          <WinResult mode={mode} data={current?.previousPeriod} />
          <div className="main-bg2 relative">
            <SizeSwitch
              size={size}
              mode={mode}
              data={current}
              onChange={setSize}
              coin={coin}
            />
            <div className="w-100% mt-14px">
              <CountDown
                data={userData}
                coin={coin}
                time={time}
                onChange={onChangeTime}
              />
              <AmountSet
                amt={amt}
                onChange={(v) => {
                  setAmt(v);
                  setAmount(v);
                }}
                coin={coin}
                mode={mode}
              />
              <AccountSet
                payType={payType}
                onChangePayType={() => {
                  setPayType((p) => (p === 1 ? 2 : 1));
                  updateAsset();
                }}
                amt={amt}
                amount={amount}
                onChange={setAmount}
                coin={coin?.assetType}
              />
              <Confirm
                coin={coin?.assetType}
                mode={mode}
                size={size}
                balance={balance}
                onConfirm={_confirm}
                isLoading={loading}
                isLogin={!!token}
                isDrawing={time <= 0}
              />
            </div>
          </div>
        </div>
      </div>
      <ResultModal bettAsset={coin?.assetType} />
    </div>
  );
}
