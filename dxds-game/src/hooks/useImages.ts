import { useImage } from "react-image";
const useImages = () => {
  useImage({
    srcList: [
      "/images/arrow-l.png",
      "/images/arrow-r.png",
      "/images/bg-h5.png",
      "/images/bg.jpg",
      "/images/bg.png",
      "/images/bg1-head.png",
      "/images/bg1.jpg",
      "/images/bg2-h5.jpg",
      "/images/bg2.jpg",
      "/images/bg3-cai.png",
      "/images/big-bg.png",
      "/images/bottom-bg.png",
      "/images/bottom-blue.png",
      "/images/bottom-pink.png",
      "/images/btn-bg.png",
      "/images/btn-BNB.png",
      "/images/btn-USDC.png",
      "/images/btn-USDC.png",
      "/images/token-USDT.png",
      "/images/touzhu-bg1-default.png",
      "/images/touzhu-bg2-default.png",
      "/images/touzhu-cai.png",
      "/images/touzhu1-bg.png",
      "/images/touzhu2-bg.png",
      "/images/u-bg1.png",
      "/images/u-bg2.png",
      "/images/user-bg1.png",
      "/images/user-bg2.png",
      "/images/zuozhuang-bg1.png",
      "/images/zuozhuang-bg2.png",
    ],
    useSuspense: true,
  });
};

export default useImages;
