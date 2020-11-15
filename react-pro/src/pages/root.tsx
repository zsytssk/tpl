import { actions } from "@app/redux/modules/app";
import { RootState } from "@app/redux/store";
import { formatLang, setLang } from "@app/utils/i18nUtils";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

export default function Root() {
  const { lang: urlLang } = useParams<any>();
  const lang = useSelector((state: RootState) => state.app.lang);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const [new_lang, change] = formatLang(urlLang);
    if (change) {
      console.log(`test:>`, location);
      const { pathname, search, hash } = location;
      history.replace(`${new_lang}${pathname}/${search}/${hash}`);
    }
    dispatch(actions.setLang(formatLang(new_lang)));
  }, []);

  console.log(`test:>`, location);
  useEffect(() => {
    setLang(lang);
    // history.replace(``);
  }, [lang]);

  return <>root</>;
}
