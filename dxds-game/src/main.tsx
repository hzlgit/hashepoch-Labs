import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./base.less";
import "uno.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./locale/Provider.tsx";
import "@ant-design/v5-patch-for-react-19";
import { LoadingProvider } from "./contexts/Loading.tsx";

import "overlayscrollbars/overlayscrollbars.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: true } },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>
);
