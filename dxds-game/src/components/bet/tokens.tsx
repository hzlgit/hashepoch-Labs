import { Dropdown } from "antd";

import ArrowDownIcon from "../icons/ArrowDown";
import { map } from "lodash";
import { useState } from "react";
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

  const [open, setOpen] = useState(false);
  // const isList = useMemo(
  //   () =>
  //     findIndex(slice(list, 1), (a) => a.assetType === selected?.assetType) >
  //     -1,
  //   [selected, list]
  // );

  return (
    <>
      <Dropdown
        rootClassName="modal-token-select-wrap record-dropdown"
        trigger={["click"]}
        arrow={false}
        open={open}
        placement="bottomRight"
        onOpenChange={setOpen}
        popupRender={() => (
          <div className="min-w-120px ">
            <OverlayScrollbarsComponent
              className=" max-h-260px "
              options={{
                scrollbars: { theme: "os-theme-dark", visibility: "auto" },
                overflow: { x: "hidden", y: "scroll" },
                paddingAbsolute: true,
              }}
            >
              {map(list, (item, key) => (
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
            </OverlayScrollbarsComponent>
          </div>
        )}
      >
        <div
          className={`bet-coin-item  ${
            selected?.tokenSymbol ? "selected" : ""
          }`}
          onClick={() => play(0)}
        >
          <div className="flex items-center flex-1 justify-center ">
            {selected?.tokenSymbol ?? list?.[0]?.tokenSymbol}
            <ArrowDownIcon
              className={`w-24px h-24px transition-transform  ${
                open ? "transform-rotate-z-180" : ""
              }`}
            />
          </div>
        </div>
      </Dropdown>
    </>
  );
}
