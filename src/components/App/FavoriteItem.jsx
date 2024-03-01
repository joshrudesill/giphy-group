import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FavoriteItem({
  name,
  id,
  url,
  category_name,
  category_id,
}) {
  const dispatch = useDispatch();
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const [cat, setCat] = useState(0);
  const categories = useSelector((state) => state.categories);

  return (
    <div className='flex flex-col border rounded-lg'>
      <div className='p-1.5 text-wrap'>
        <h3 className='text-lg font-mono text-center text-wrap'>
          Category: {category_name}
        </h3>
      </div>
      <img src={url} className='object-scale-down h-56 w-80 bg-slate-200' />
      <div className='flex flex-row justify-center pt-2'>
        {!isChangingCategory ? (
          <>
            <button
              onClick={() => setIsChangingCategory(true)}
              type='button'
              className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 shadow-lg shadow-lime-500/50  font-medium rounded-lg text-sm px-4 py-2 text-center mb-2 me-2'
            >
              Change Category
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE_FAV", payload: { id } })}
              type='button'
              className='text-gray-900 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 shadow-lg shadow-orange-500/50  font-medium rounded-lg text-sm px-4 py-2 text-center mb-2'
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <select
              onChange={(e) => setCat(e.target.value)}
              value={cat}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 ms-2'
            >
              {categories.map((c) => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
            <button
              onClick={() => {
                dispatch({
                  type: "UPDATE_FAV_CAT",
                  payload: { id: id, category: cat },
                });
                setIsChangingCategory(false);
              }}
              className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-1 mb-2 ms-1'
            >
              Change
            </button>

            <button
              onClick={() => setIsChangingCategory(false)}
              className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2'
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
