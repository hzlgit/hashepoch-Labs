import { App } from "antd";
import Help from "../icons/Help";
// import Settings from "../icons/Settings";
import Volume from "../icons/Volume";
import RulesModal from "../rules-modal";
import CloseOutline from "../icons/CloseOutline";
import "./index.less";
import useTranslation from "@/locale";
import useAppStateStore from "@/store/state";
import useSound from "@/hooks/useSound";
import { sdk } from "@/hooks/useGameSdk";

export default function Header() {
  const { modal } = App.useApp();
  const { t } = useTranslation();
  const { mute, changeMute } = useAppStateStore();
  const { play } = useSound();

  return (
    <>
      <div
        className="absolute settings cursor-pointer"
        onClick={() => sdk.call("back", {})}
      >
        {/* <Settings className={`w-28px h-28px md:w-24px md:h-24px color-#000 `} /> */}
        <CloseOutline className={`w-28px h-28px md:w-24px md:h-24px color-#000 `}></CloseOutline>
      </div>
      <div
        className="absolute volume cursor-pointer"
        onClick={() => {
          play(0);
          changeMute(!mute);
        }}
      >
        <Volume
          className={`w-28px h-28px md:w-24px md:h-24px color-#000 ${mute ? "mute" : "open"}`}
        />
      </div>
      <div
        className="absolute rules-icon cursor-pointer"
        onClick={() => {
          play(0);
          modal.info({
            icon: null,
            footer: null,
            centered: true,
            closable: true,
            maskClosable: true,
            closeIcon: <CloseOutline onClick={() => play(0)} />,
            content: <RulesModal></RulesModal>,
          });
        }}
      >
        <Help className="w-28px h-28px md:w-24px md:h-24px color-#000" />
      </div>
      <div className="token-select">{t("Token Selection")}</div>
      <div className="token-select token-select1 opacity-0 lg:opacity-100">
        {t("Game Mode Selection")}
      </div>
    </>
  );
}
