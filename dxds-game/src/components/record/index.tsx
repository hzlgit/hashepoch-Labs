import numeral from "numeral";
import "./index.less";
import { map, times } from "lodash";
import {
  OverlayScrollbarsComponent,
  type OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import { useEffect, useMemo, useRef } from "react";
import useTranslation from "@/locale";

export default function GameRecord({
  data,
  mode,
}: {
  data: any;
  mode: number;
}) {
  const { t } = useTranslation();
  const scrollRef = useRef<OverlayScrollbarsComponentRef>(null);
  useEffect(() => {
    const osInstance = scrollRef.current?.osInstance();
    if (data && osInstance) {
      const { viewport } = osInstance.elements();
      viewport.scrollTo({ left: viewport.scrollWidth });
    }
  }, [data, mode]);

  const dataList = useMemo(
    () => (mode === 1 ? data?.bigsmall : data?.oddeven),
    [data, mode]
  );
  return (
    <>
      <div className="flex flex-col">
        <div className="w-100% pl-21px pr-5px flex justify-between font-bold box-border ">
          <div className="text-20px color-#2A2A2A mt-16px label">
            {t("Draw Records")}
          </div>
          <div className="bg3-gray relative mt-2px pl-63px pr-14px">
            <img
              src="/images/bg3-cai.png"
              className="w-596px h-47px absolute left-0 bottom-0 animate1"
              alt=""
            />
            <div className="flex items-center">
              <div className="w-32px md:w-26px h-32px md:h-26px rounded-100% bg-[var(--vt-c-main4)] text-16px mr-10px text-center flex items-center justify-center mr-14px">
                {t("B")}
              </div>
              <div className="text-16px mr-33px">
                {numeral(data?.statistics?.bigCount).format("00")}
              </div>
              <div className="w-32px md:w-26px h-32px md:h-26px rounded-100% bg-[var(--vt-c-main2)] text-16px mr-10px text-center flex items-center justify-center mr-14px">
                {t("S")}
              </div>
              <div className="text-16px mr-37px">
                {numeral(data?.statistics?.smallCount).format("00")}
              </div>
              <div className="w-32px md:w-26px h-32px md:h-26px rounded-100% bg-[var(--vt-c-main4)] text-16px mr-10px text-center flex items-center justify-center mr-14px">
                {t("O")}
              </div>
              <div className="text-16px mr-33px">
                {numeral(data?.statistics?.oddCount).format("00")}
              </div>
              <div className="w-32px md:w-26px h-32px md:h-26px rounded-100% bg-[var(--vt-c-main2)] text-16px mr-10px text-center flex items-center justify-center mr-14px">
                {t("E")}
              </div>
              <div className="text-16px mr-37px">
                {numeral(data?.statistics?.evenCount).format("00")}
              </div>
            </div>
            {/* <div className="text-16px cursor-pointer relative z-2">更多</div> */}
          </div>
        </div>
        <div className="pl-36px pr-25px">
          <div className="mt-40px font-bold h-235px box-border pr-12px ">
            <OverlayScrollbarsComponent
              ref={scrollRef}
              style={{ width: "100%", height: "100%" }}
              className="box-border pb-12px "
              options={{
                scrollbars: { theme: "os-theme-dark", visibility: "auto" },
                overflow: { x: "scroll", y: "hidden" },
                paddingAbsolute: true,
              }}
            >
              <div className="flex pr-10px">
                {map(dataList, (item, idx) => (
                  <div
                    key={`${idx}-${mode}`}
                    className={`flex flex-col gap-12px mr-9px ${
                      idx === dataList?.length - 1 ? "min-w-36px" : ""
                    }`}
                  >
                    {times(item.count).map((key) => (
                      <div
                        key={key}
                        className={`w-36px h-36px md:w-32px md:h-32px rounded-100% flex items-center justify-center bg-[${
                          item.type === 2
                            ? "var(--vt-c-main2)"
                            : "var(--vt-c-main4)"
                        }] text-16px text-center `}
                      >
                        {t(
                          mode === 1
                            ? item.type === 1
                              ? "B"
                              : "S"
                            : item.type === 1
                            ? "O"
                            : "E"
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </div>
    </>
  );
}
