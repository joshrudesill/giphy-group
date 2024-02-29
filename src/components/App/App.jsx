import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favorites);
  const cats = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch({ type: "FETCH_FAV" });
    dispatch({type: "FETCH_CATS"});
  }, []);
  return (
    <div>
      <h1>Giphy Search!</h1>
      {JSON.stringify(favs)}
      {JSON.stringify(cats)}
      <button onClick={() => dispatch({type: "POST_FAV", payload: {name: 'name', url: 'url', category: 'category'}})}>post test</button>
    </div>
  );
}

export default App;
