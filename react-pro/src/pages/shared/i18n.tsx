import React, { createContext } from "react";
import { useSelector } from "react-redux";
import i18n from "@app/i18n";
import { RootState } from "@app/redux/store";

export const LocaleMap = {
  "zh-Hans": { value: "zh_CN", oldStandard: "zh-CN" },
  "zh-Hant": { value: "zh_TW", oldStandard: "zh-TW" },
  en: { value: "en_GB", oldStandard: "en" },
  ja: { value: "ja_JP", oldStandard: "ja" },
  ko: { value: "ko_KR", oldStandard: "ko" },
  pt: { value: "pt_PT", oldStandard: "pt" },
  vi: { value: "vi_VN", oldStandard: "vi" },
  ar: { value: "ar_EG", oldStandard: "ar" },
};

export const LanguageContext = createContext<any>({});

export const LanguageProvider = (props: any) => {
  const lang = useSelector((state: RootState) => state.app.lang);
  document.getElementsByTagName("html")[0].setAttribute("lang", lang + "");
  return (
    <LanguageContext.Provider value={i18n[lang]}>
      {props.children}
    </LanguageContext.Provider>
  );
};
