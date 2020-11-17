import { actions } from "@app/redux/modules/app";
import { RootState } from "@app/redux/store";
import { formatLang, setLang } from "@app/utils/i18nUtils";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";
import {
  Link,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

export default function Root(props: any) {
  const { lang: urlLang } = useParams<any>();
  const refOldLang = useRef<string>("");
  const lang = useSelector((state: RootState) => state.app.lang);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const [new_lang, change] = formatLang(urlLang);
    if (change) {
      const { pathname, search, hash } = location;
      history.replace(`${new_lang}${pathname}${search}${hash}`);
    }
    dispatch(actions.setLang(new_lang));
  }, []);

  useEffect(() => {
    setLang(lang);
    const { pathname, search, hash } = location;
    if (refOldLang.current && refOldLang.current !== lang) {
      const new_path = pathname.replace(refOldLang.current, lang);
      history.replace(`${new_path}${search}${hash}`);
    }
    refOldLang.current = lang;
  }, [lang]);

  return (
    <>
      root
      <Link to={`/${lang}/loading`}>loading</Link>
      <Switch>{renderRoutes(props.route.routes)}</Switch>
    </>
  );
}
