import useTranslation from "@/locale";

import { Dropdown } from "antd";

import ArrowDownIcon from "../icons/ArrowDown";
import { findIndex, slice } from "lodash";
import { useMemo, useState } from "react";
import useSound from "@/hooks/useSound";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function TokenList({
  list,
  selected,
  onChange,
}: {
  list: Array<any>;
  selected?: any;
  onChange?: (selected: any) => void;
}) {
  const { play } = useSound();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isList = useMemo(
    () =>
      findIndex(slice(list, 2), (a) => a.assetType === selected?.assetType) >
      -1,
    [selected, list]
  );

  return (
    <div className="flex gap-37px mt-51px mb-40px md:mb-30px">
      {slice(list, 0, 2).map((item, i) => (
        <div
          key={i}
          className={`mtoken-item ${
            selected?.id == item?.id ? "selected" : ""
          }`}
          onClick={
            item
              ? () => {
                  onChange?.(item);
                  play(0);
                }
              : undefined
          }
        >
          <img className="w-32px h-32px rounded-100%" src={item?.tokenLogo} />
          {item ? (
            <span className="token-name">{item?.tokenSymbol}</span>
          ) : (
            <span className="token-name">{t("Coming Soon")}</span>
          )}
        </div>
      ))}
      <Dropdown
        rootClassName="modal-token-select-wrap"
        trigger={["click"]}
        arrow={false}
        open={open}
        onOpenChange={setOpen}
        popupRender={() => (
          <div className="min-w-120px">
            <OverlayScrollbarsComponent
              className=" max-h-260px"
              options={{
                scrollbars: { theme: "os-theme-dark", visibility: "auto" },
                overflow: { x: "hidden", y: "scroll" },
                paddingAbsolute: true,
              }}
            >
              {slice(list, 2).map((item, key) => (
                <div
                  key={key}
                  className="flex items-center gap-16px select-item"
                  onClick={() => {
                    onChange?.(item);
                    setOpen(false);
                    play(0);
                  }}
                >
                  <img
                    src={item.tokenLogo}
                    alt=""
                    className="w-30px h-30px rounded-100% "
                  />
                  <div className="text-18px font-bold text">
                    {item.tokenSymbol}
                  </div>
                </div>
              ))}
            </OverlayScrollbarsComponent>
          </div>
        )}
      >
        <div
          className={`mtoken-item show-arrow ${isList ? "selected" : ""}`}
          onClick={() => play(0)}
        >
          <img
            src={isList ? selected?.tokenLogo : "/images/token-other.png"}
            alt=""
            className="w-30px h-30px rounded-100% "
          />
          <div className="flex items-center flex-1 justify-center">
            {isList ? selected?.tokenSymbol : t("Other")}
          </div>
          <ArrowDownIcon className="arrow" />
        </div>
      </Dropdown>
    </div>
  );
}
