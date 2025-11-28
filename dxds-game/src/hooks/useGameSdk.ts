import HashEpochSDK from "@/sdk/lib/main";
import { useEffect } from "react";

export const sdk = new HashEpochSDK({
  targetWindow: window.parent,
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://dapp.hashepoch.io",
    "https://dapp.hashepoch.net",
  ],
});

const useGameSdk = ({ assetUpdate }: { assetUpdate: (data: any) => void }) => {
  useEffect(() => {
    sdk.on("assetUpdate", assetUpdate);
  }, [assetUpdate]);

  return {
    sdk,
  };
};

export default useGameSdk;
