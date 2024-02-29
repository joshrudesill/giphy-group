import { useSelector } from "react-redux";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  return <>{JSON.stringify(favorites)}</>;
}
