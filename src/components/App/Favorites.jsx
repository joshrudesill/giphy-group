import { useSelector } from "react-redux";
import FavoriteItem from "./FavoriteItem";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  return (
    <div className='flex flex-row gap-2 flex-wrap justify-center'>
      {favorites.map((fav) => (
        <FavoriteItem key={fav.id} {...fav} />
      ))}
    </div>
  );
}
