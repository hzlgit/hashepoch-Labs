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
  const { play } = useSound();

  const [open, setOpen] = useState(false);
  const isList = useMemo(
    () =>
      findIndex(slice(list, 2), (a) => a.assetType === selected?.assetType) >
      -1,
    [selected, list]
  );

  return (
    <>
      {slice(list, 0, 2).map((item, i) => (
        <div
          key={i}
          className={`htoken-item ${
            item.assetType === selected?.assetType ? "selected" : ""
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
          <span className="token-name">{item?.tokenSymbol}</span>
        </div>
      ))}
      <Dropdown
        rootClassName="modal-token-select-wrap record-dropdown"
        trigger={["click"]}
        arrow={false}
        open={open}
        onOpenChange={setOpen}
        popupRender={() => (
          <div className="min-w-120px">
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
                <div className="text-18px font-bold text">
                  {item.tokenSymbol}
                </div>
              </div>
            ))}
          </div>
        )}
      >
        <div
          className={`htoken-item w-85px ${isList ? "selected" : ""}`}
          onClick={() => play(0)}
        >
          <div className="flex items-center flex-1 justify-center ">
            {isList ? selected?.tokenSymbol : slice(list, 2)?.[0]?.tokenSymbol}
            <ArrowDownIcon
              className={`w-24px h-24px transition-transform  ${
                open ? "transform-rotate-z-180" : ""
              }`}
            ></ArrowDownIcon>
          </div>
        </div>
      </Dropdown>
    </>
  );
}
