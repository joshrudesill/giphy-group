import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";

function* test() {
  console.log("Hello from test saga");
}

const sagaMiddleware = createSagaMiddleware();

const favorites = (state = [], action) => {
  switch (action.type) {
    case "REFRESH_FAVORITES":
      return action.payload;
  }
  return state;
};
const categories = (state = [], action) => {
  switch (action.type) {
    case "REFRESH_CATS":
      return action.payload;
  }
  return state;
};
const search = (state = {}, action) => {
  switch (action.type) {
    case "SET_SEARCH_RES":
      return action.payload;
  }
  return state;
};

function* fetchFavs() {
  try {
    const result = yield axios.get("/api/favorites");
    yield put({ type: "REFRESH_FAVORITES", payload: result.data });
  } catch (e) {
    console.error(e);
  }
}

function* rootSaga() {
  yield takeLatest("FETCH_FAV", fetchFavs);
}

const store = createStore(
  combineReducers({
    favorites,
    categories,
    search,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
