import memoize from "lodash/memoize";
import * as React from "react";
import { createContext, useCallback } from "react";

import { languages } from "./config";
import en from "./translations/en.json";
import es from "./translations/es.json";
import hk from "./translations/hk.json";
import jp from "./translations/jp.json";
import kr from "./translations/kr.json";
import pt from "./translations/pt.json";
import vn from "./translations/vn.json";
// import zh from './translations/zh.json'
import type { ContextApi, Language, TranslateFunction } from "./types";
import useAppStore from "@/store/user";

const includesVariableRegex = new RegExp(/%\S+?%/, "gm");
const languageMap = new Map<Language, Record<string, string>>();

// languageMap.set(languages.zh, zh)
languageMap.set(languages.hk, hk);
languageMap.set(languages.en, en);
languageMap.set(languages.vi, vn);
languageMap.set(languages.jp, jp);
languageMap.set(languages.ko, kr);
languageMap.set(languages.es, es);
languageMap.set(languages.pt, pt);

const translatedTextIncludesVariable = memoize(
  (translatedText: string): boolean => {
    return !!translatedText?.match(includesVariableRegex);
  }
);

const getRegExpForDataKey = memoize((dataKey: string): RegExp => {
  return new RegExp(`%${dataKey}%`, "g");
});

const LanguageContext = createContext<ContextApi | undefined>(undefined);

const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const fallback = { languageTag: DEFAULT_LANG, isRTL: false };

  const { lang, setLang } = useAppStore();

  const setLanguage = useCallback(
    async (language: Language) => {
      setLang(language);
    },
    [setLang]
  );

  React.useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const _langSearch = params.get("lang");
    if (_langSearch) {
      setLanguage(_langSearch);
    }
  }, [setLanguage]);

  const translate: TranslateFunction = useCallback(
    (key, data) => {
      const translationSet = languageMap.get(lang) ?? {};

      const translatedText = translationSet?.[key] || key;
      if (data) {
        const includesVariable = translatedTextIncludesVariable(key);
        if (includesVariable) {
          let interpolatedText = translatedText;
          Object.keys(data).forEach((dataKey) => {
            interpolatedText = interpolatedText.replace(
              getRegExpForDataKey(dataKey),
              data[dataKey]?.toString()
            );
          });
          return interpolatedText;
        }
      }
      return translatedText;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
export { LanguageContext, LanguageProvider };
