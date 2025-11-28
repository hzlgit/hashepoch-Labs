import translations from "./translations/hk.json";

export type ContextData = {
  [key: string]: string | number;
};

export type Language = "en-US" | "zh-CN" | string;

export interface ContextApi {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: TranslateFunction;
}

type MaybeObject = Record<never, never>;
export type TranslationKey = keyof typeof translations | (string & MaybeObject);

export type TranslateFunction = (
  key: TranslationKey,
  data?: ContextData
) => string;
