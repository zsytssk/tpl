import { actions } from "@app/redux/modules/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const stateId = useSelector((state) => (state as any).app?.stateId);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(actions.update());
        }}
      >
        click {stateId}
      </button>
      <br />
      <Link to="/loading">loading</Link>
    </div>
  );
}
