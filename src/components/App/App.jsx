import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route } from "react-router-dom/cjs/react-router-dom.min";
import Search from "./Search";
import Favorites from "./Favorites";

function App() {
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favorites);
  const cats = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch({ type: "FETCH_FAV" });
    dispatch({ type: "FETCH_CATS" });
  }, []);
  return (
    <div>
      <h1>Giphy Search!</h1>
      <HashRouter>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/favorites'>
          <Favorites />
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;
