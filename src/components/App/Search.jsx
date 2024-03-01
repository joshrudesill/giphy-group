import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const searchRes = useSelector((state) => state.search);
  const categories = useSelector((state) => state.categories);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(0);

  useEffect(() => {
    if (categories.length > 0) {
      setCat(categories[0].id);
    }
  }, [categories]);
  return (
    <>
      <div className='text-center'>
        <label
          htmlFor='s'
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          Search a GIF!
        </label>
        <input
          value={search}
          id='s'
          onChange={(e) => setSearch(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-64 p-1.5 mb-2 me-2'
        />
        <button
          onClick={() => {
            dispatch({ type: "GET_GIF", payload: search });
            setSearch("");
          }}
          className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 shadow-lg shadow-lime-500/50  font-medium rounded-lg text-sm px-4 py-2 text-center mb-3'
        >
          Search
        </button>
      </div>
      {searchRes.url ? (
        <div>
          <select
            onChange={(e) => setCat(e.target.value)}
            value={cat}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-1 mb-3'
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            className='text-gray-900 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50  font-medium rounded-lg text-sm px-4 py-2 mb-3'
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
        </div>
      ) : (
        <p className='font-mono text-2xl text-center'>
          Search something first!
        </p>
      )}
    </>
  );
}
