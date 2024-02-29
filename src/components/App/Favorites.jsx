import { useSelector } from "react-redux";
import FavoriteItem from "./FavoriteItem";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  return <>
      <p>
        {favorites.map(fav => (
          <FavoriteItem {...fav}/>
        ))}
      </p>
  </>;
}
