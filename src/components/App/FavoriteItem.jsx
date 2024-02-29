import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function FavoriteItem({ name, id, url, category_name, category_id }) {
    const dispatch = useDispatch();
    const [isChangingCategory, setIsChangingCategory] = useState(false);
    const [cat, setCat] = useState(0);
    const categories = useSelector((state) => state.categories);

    return <>
        <div>
            <p>{category_name}</p>
            <img src={url} />
            {!isChangingCategory ? <button onClick={() => setIsChangingCategory(true)}>Change Category</button> : <>
                <select onChange={(e) => setCat(e.target.value)} value={cat}>
                    {categories.map((c) => (
                        <option value={c.id}>{c.name}</option>
                    ))}
                </select>
                <button onClick={() => { dispatch({ type: "UPDATE_FAV_CAT", payload: { id: id, category: cat } }) }}>Change</button>
                <button onClick={() => setIsChangingCategory(false)}>Cancel</button>
            </>}
        </div>

    </>


}
