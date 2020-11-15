import { actions } from "@app/redux/modules/app";
import { RootState } from "@app/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import style from "./style.less";

export default function Home() {
  const stateId = useSelector((state) => (state as any).app?.stateId);
  const lang = useSelector((state: RootState) => (state as any).app?.lang);
  const dispatch = useDispatch();

  return (
    <div className={style.div}>
      <button
        onClick={() => {
          dispatch(actions.setLang("en"));
        }}
      >
        click {stateId}
      </button>
      <br />
      <Link to={`/${lang}/loading`}>loading</Link>
    </div>
  );
}
