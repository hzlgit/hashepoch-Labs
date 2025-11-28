import Spin from "@/components/spin";
import useTranslation from "@/locale";

import React, { createContext, useState } from "react";
import { useContext } from "react";
import { createPortal } from "react-dom";

import "./index.less";

export type LoadingProps = {
  show: boolean;
  text?: string;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingProps>({
  show: false,
  text: "",
  showLoading: () => {},
  hideLoading: () => {},
});

const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [state, setState] = useState<{
    text?: string;
    show: boolean;
  }>({
    text: t("Loading..."),
    show: false,
  });

  const showLoading = (text?: string) => {
    setState({
      show: true,
      text: text ?? state.text,
    });
  };
  const hideLoading = () => {
    setState({
      text: t("Loading..."),
      show: false,
    });
  };

  return (
    <LoadingContext.Provider
      value={{ show: state.show, showLoading, hideLoading }}
    >
      {children}
      {state.show
        ? (createPortal(
            <div className="hash-loading">
              <div className="hash-loading-content">
                <Spin />
                <span>{state.text}</span>
              </div>
            </div>,
            document.body
          ) as any)
        : null}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const loadingContext = useContext(LoadingContext);

  if (loadingContext === undefined) {
    throw new Error("LoadingContext context is undefined");
  }

  return loadingContext;
};

export { LoadingProvider };

// eslint-disable-next-line react-refresh/only-export-components
export default useLoading;
