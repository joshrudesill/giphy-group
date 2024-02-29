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
    case "RESET_SEARCH_RES":
      return {};
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

function* fetchCats() {
  try {
    const result = yield axios.get("/api/categories");
    yield put({ type: "REFRESH_CATS", payload: result.data });
  } catch (e) {
    console.log(e);
  }
}

function* postFav(action) {
  try {
    yield axios.post("/api/favorites", {
      name: action.payload.name,
      url: action.payload.url,
      category: action.payload.category,
    });
    yield put({ type: "RESET_SEARCH_RES" });
    yield put({ type: "FETCH_FAV" });
  } catch (e) {
    console.log(e);
  }
}

function* updateFavCat(action) {
  try {
    yield axios.put(`/api/favorites/${action.payload.id}`, {
      category: action.payload.category,
    });
    yield put({ type: "FETCH_FAV" });
  } catch (e) {
    console.log(e);
  }
}
function* deleteFav(action) {
  try {
    yield axios.delete(`/api/favorites/${action.payload.id}`);
    yield put({ type: "FETCH_FAV" });
  } catch (e) {
    console.log(e);
  }
}
function* getGif(action) {
  try {
    const result = yield axios.get("/api/favorites/gif", {
      params: {
        t: action.payload,
      },
    });
    yield put({
      type: "SET_SEARCH_RES",
      payload: {
        url: result.data.data.images.original.webp,
        name: result.data.data.title,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

function* rootSaga() {
  yield takeLatest("FETCH_FAV", fetchFavs);
  yield takeLatest("FETCH_CATS", fetchCats);
  yield takeLatest("POST_FAV", postFav);
  yield takeLatest("UPDATE_FAV_CAT", updateFavCat);
  yield takeLatest("DELETE_FAV", deleteFav);
  yield takeLatest("GET_GIF", getGif);
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
