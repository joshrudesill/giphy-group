import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";

function* test() {
  console.log("Hello from test saga");
}

function* rootSaga() {
  yield takeLatest("TEST", test);
}

const sagaMiddleware = createSagaMiddleware();

const favorites = (state = [], action) => {
  return state;
};
const categories = (state = [], action) => {
  return state;
};

const store = createStore(
  combineReducers({
    favorites,
    categories,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
