import { doLogin } from "@/api";
import useTranslation from "@/locale";
import useAppStore from "@/store/user";
import { getQueryString } from "@/utils";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
  const { setToken, setGameId } = useAppStore();
  const signature = getQueryString("gameData");
  const gameId = getQueryString("gameId") ?? "";
  const { setLanguage } = useTranslation();
  const pending = useRef(false);

  const autoLogin = useCallback(async () => {
    if (signature && !pending.current) {
      setToken("");
      try {
        pending.current = true;
        const res = await doLogin({
          gameId,
          signature,
        });
        if (res.code === "0000") {
          setToken(res.data?.accessToken);
          setLanguage(res.data?.lang);
          setGameId(gameId);
        } else {
          toast(res.msg);
        }
      } catch (e) {
        console.error(e);
        pending.current = false;
      } finally {
        pending.current = false;
      }
    }
  }, [gameId, setToken, signature, setLanguage]);
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
};
export default useLogin;
