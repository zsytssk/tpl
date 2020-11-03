import { createStore, applyMiddleware, compose } from "redux";
import { forbiddenWordsMiddleware } from "./middlewares";
import rootReducer from "./reducers";

export default function configureStore() {
  const storeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
  );
}
