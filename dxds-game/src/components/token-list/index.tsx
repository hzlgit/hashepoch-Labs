import useTranslation from "@/locale";

import "./index.less";

import { Dropdown } from "antd";

import ArrowDownIcon from "../icons/ArrowDown";
import { findIndex, slice } from "lodash";
import { useMemo, useState } from "react";
import useSound from "@/hooks/useSound";

export default function TokenList({
  list,
  selected,
  onChange,
}: {
  list: Array<any>;
  selected?: any;
  onChange?: (selected: any) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { play } = useSound();
  const isList = useMemo(
    () =>
      findIndex(slice(list, 2), (a) => a.assetType === selected?.assetType) >
      -1,
    [selected, list]
  );

  return (
    <div className="game-token-list w-100% flex justify-between pt-15px">
      <div className="game-token-list__tokens flex justify-between">
        {slice(list, 0, 2).map((item, i) => (
          <div
            key={i}
            className={`token-item ${
              selected?.id == item?.id ? "selected" : ""
            }`}
            onClick={
              item
                ? () => {
                    onChange?.(item);
                    play(4);
                  }
                : undefined
            }
          >
            <div className="token-item__content">
              {item ? (
                <>
                  {" "}
                  <img className="logo" src={item?.tokenLogo}></img>
                  <span className="token-name">{item?.tokenSymbol}</span>
                </>
              ) : (
                <span className="token-name">{t("Coming Soon")}</span>
              )}
            </div>
          </div>
        ))}
        <Dropdown
          rootClassName="token-select-wrap"
          trigger={["click"]}
          arrow={false}
          open={open}
          onOpenChange={setOpen}
          popupRender={() => (
            <div>
              {slice(list, 2).map((item, key) => (
                <div
                  key={key}
                  className="flex items-center gap-16px select-item"
                  onClick={() => {
                    onChange?.(item);
                    setOpen(false);
                    play(4);
                  }}
                >
                  <img
                    src={item.tokenLogo}
                    alt=""
                    className="w-30px h-30px rounded-100% "
                  />
                  <div className="text-20px font-bold text">
                    {item.tokenSymbol}
                  </div>
                </div>
              ))}
            </div>
          )}
        >
          <div
            className={`token-item justify-between flex items-center ${
              isList ? "selected" : ""
            }`}
            onClick={() => play(0)}
          >
            <div className="token-item__content">
              <img
                src={
                  isList ? selected?.tokenLogo : slice(list, 2)?.[0]?.tokenLogo
                }
                alt=""
                className="w-30px h-30px rounded-100% "
              />
              <div className="token-name">
                {isList
                  ? selected?.tokenSymbol
                  : slice(list, 2)?.[0]?.tokenSymbol}
              </div>
            </div>
            <ArrowDownIcon className="arrow" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
