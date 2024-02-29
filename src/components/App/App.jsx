import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch({ type: "FETCH_FAV" });
  }, []);
  return (
    <div>
      <h1>Giphy Search!</h1>
      {JSON.stringify(favs)}
    </div>
  );
}

export default App;
