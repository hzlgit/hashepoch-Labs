import HomeView from "./Home";
import Launch from "@/components/launch";

import assets from "@/components/launch/assets.json";

import { useMediaPreloader } from "@/hooks/useMediaPreloader";

export default function HomeViewPage() {
  const { loadEnd, progressPercent } = useMediaPreloader(assets);

  return (
    <>
      {!loadEnd && <Launch progress={progressPercent} />}
      <HomeView />
    </>
  );
}
