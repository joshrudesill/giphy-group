import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Link, Route } from "react-router-dom";
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
    <div className='p-5'>
      <h1 className='text-2xl font-bold tracking-widest'>Giphy Search!</h1>

      <HashRouter>
        <div className='flex flex-row gap-3 mb-4'>
          <Link
            to='/favorites'
            className='text-red-500 hover:border-b-2 hover:border-gray-950 border-b-2 border-transparent hover:border-solid text-xl'
          >
            Favorites
          </Link>
          <Link
            to='/search'
            className='hover:border-b-2 hover:border-gray-950 border-b-2 border-transparent hover:border-solid text-xl text-stone-700'
          >
            Search
          </Link>
        </div>
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
