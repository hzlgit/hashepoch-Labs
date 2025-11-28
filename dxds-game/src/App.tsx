import { useWindowSize } from "react-use";
import HomeView from "./views";
import setRem from "./rem";
import React, { useEffect } from "react";
import { App } from "antd";
import { resolveValue, Toaster } from "react-hot-toast";

import useLogin from "./hooks/useLogin";
import Spin from "./components/spin";

export const LazyLoad = (
  Component: React.LazyExoticComponent<React.FC<object>>
) => {
  return (
    <React.Suspense
      fallback={
        <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
          <Spin></Spin>
        </div>
      }
    >
      <Component />
    </React.Suspense>
  );
};

function AppScreen() {
  useEffect(() => {
    setRem();
  }, []);
  useWindowSize({
    onChange: () => {
      setRem();
    },
  });

  useLogin();

  return (
    <App style={{ color: "#fff" }}>
      <HomeView />

      <Toaster
        containerClassName="hash-hot-toast"
        containerStyle={{
          top: "50%",
        }}
        toastOptions={{
          duration: 3500,
          className: "hash-hot-toast__wrap",
        }}
        reverseOrder={false}
      >
        {(t) => (
          <div
            className="hash-hot-toast__content"
            style={{ opacity: t.visible ? 1 : 0 }}
          >
            {t.icon}
            {resolveValue(t.message, t)}
          </div>
        )}
      </Toaster>
    </App>
  );
}

export default AppScreen;
