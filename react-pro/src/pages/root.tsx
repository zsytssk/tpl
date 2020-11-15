import { actions } from "@app/redux/modules/app";
import { RootState } from "@app/redux/store";
import { formatLang, setLang } from "@app/utils/i18nUtils";
import React, { useEffect } from "react";
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
  const lang = useSelector((state: RootState) => state.app.lang);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const [new_lang, change] = formatLang(urlLang);
    if (change) {
      const { pathname, search, hash } = location;
      let new_path = `${new_lang}${pathname}`;
      history.replace(`${new_path}/${pathname}${search}${hash}`);
    }
    dispatch(actions.setLang(new_lang));
  }, []);

  useEffect(() => {
    setLang(lang);
  }, [lang]);

  return (
    <>
      root
      <Link to={`/${lang}/loading`}>loading</Link>
      <Switch>{renderRoutes(props.route.routes)}</Switch>
    </>
  );
}
