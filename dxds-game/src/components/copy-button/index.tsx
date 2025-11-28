import { useState } from "react";
import { useCopyToClipboard } from "react-use";

import IconCopied from "../icons/IconCopied";
import IconCopy from "../icons/IconCopy";
import "./index.less";
import useSound from "@/hooks/useSound";

export default function CopyText({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);
  const { play } = useSound();
  const [, copyText] = useCopyToClipboard();
  const copy = () => {
    play(0);
    copyText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <div
      className={`hash-copy-text ${className} ${
        copied ? " cursor-auto" : "cursor-pointer"
      }`}
      onClick={!copied ? copy : undefined}
    >
      {copied ? (
        <IconCopied className="copy-icon" />
      ) : (
        <IconCopy className="copy-icon" />
      )}
    </div>
  );
}
