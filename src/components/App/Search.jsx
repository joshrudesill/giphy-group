import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const searchRes = useSelector((state) => state.search);
  const categories = useSelector((state) => state.categories);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(0);

  useEffect(() => {
    if (categories.length > 0){
    setCat(categories[0].id)
    }
  }, [categories])
  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button
        onClick={() => {
          dispatch({ type: "GET_GIF", payload: search });
          setSearch("");
        }}
      >
        Search!
      </button>

      {searchRes.url ? (
        <>
          <select onChange={(e) => setCat(e.target.value)} value={cat}>
            {categories.map((c) => (
              <option value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={() =>
              dispatch({
                type: "POST_FAV",
                payload: {
                  category: cat,
                  name: searchRes.name,
                  url: searchRes.url,
                },
              })
            }
          >
            Add Favorite
          </button>
          <img src={searchRes.url} />
        </>
      ) : (
        <p>Search something first</p>
      )}
    </>
  );
}
