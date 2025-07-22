import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function SearchBar() {
  const { search, setSearch } = useContext(AppContext);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 mb-4 w-full rounded"
      placeholder="Search..."
    />
  );
}

export default SearchBar;
