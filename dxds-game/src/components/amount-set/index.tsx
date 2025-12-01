import { map } from "lodash";
import "./index.less";
import useSound from "@/hooks/useSound";

export default function AmountSet({
  coin,
  mode,
  amt,
  onChange,
}: {
  coin: any;
  mode: number;
  amt: number;
  onChange?: (amt: number) => void;
}) {
  const { play } = useSound();

  return (
    <div className="w-100% flex px-32px gap-18px mt-[-40px] box-border">
      {map(coin?.bettAmountConfig ?? [1], (item, idx) => (
        <div
          key={idx}
          className={`amount-item ${
            mode == 1 ? "amount-item1" : mode == 2 ? "amount-item2" : ""
          } ${item == amt ? "actived" : ""}`}
          onClick={() => {
            play(4);
            onChange?.(item);
          }}
        >
          <img
            src={coin?.tokenLogo}
            className="w-32px h-32px rounded-100%  relative z-2"
          />
          <span className="relative z-2 val">{item}</span>
        </div>
      ))}
    </div>
  );
}
