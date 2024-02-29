import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const searchRes = useSelector((state) => state.search);
  const [search, setSearch] = useState("");
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
        <img src={searchRes.url} />
      ) : (
        <p>Search something first</p>
      )}
    </>
  );
}
