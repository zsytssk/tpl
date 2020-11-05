import { Dispatch } from "redux";
import { handleActions, Action } from "redux-actions";

enum ActionTypes {
  UPDATE = "UPDATE",
}

const initialState = {
  stateId: 0,
};

type State = typeof initialState;

const reducer: {
  [key: string]: (state: State, action: any) => any;
} = {};

reducer[ActionTypes.UPDATE] = (state: State) => {
  return { ...state, stateId: state.stateId + 1 };
};

export const actions = {
  update() {
    return { type: ActionTypes.UPDATE };
  },
};

export default handleActions(reducer, initialState);
