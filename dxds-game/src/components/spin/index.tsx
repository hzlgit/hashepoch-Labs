import "./index.less";
export default function Spin({ className }: { className?: string }) {
  return <div className={`game-spinging ${className ?? ""}`}></div>;
}
