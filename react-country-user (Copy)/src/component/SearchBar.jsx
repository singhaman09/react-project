import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

function SearchBar() {
  const { search, setSearch } = useContext(AppContext);
  const inputRef = useRef(null);

  const { ref, focused } = useFocusable({
    focusKey: "search-bar",
    onEnterPress: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    onFocus: () => {
      console.log("SearchBar focused");
    }
  });

  // Combine refs
  const combinedRef = (node) => {
    inputRef.current = node;
    if (ref) ref.current = node;
  };

  // Handle input focus/blur
  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  // Handle keyboard events for the input
  const handleKeyDown = (e) => {
    // Allow normal text input behavior
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur(); // Remove focus from input
    }
  };

  return (
    <div className="mb-4">
      <input
        ref={combinedRef}
        id="searchInput"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`border p-3 w-full rounded outline-none transition-all ${
          focused 
            ? "ring-2 ring-blue-400 border-blue-500 bg-gray-800" 
            : "border-gray-600 bg-gray-900"
        } text-white placeholder-gray-400`}
        placeholder="Search countries..."
      />
    </div>
  );
}

export default SearchBar;