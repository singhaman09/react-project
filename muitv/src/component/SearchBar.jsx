
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function Focusable({ onEnterPress, children, focusKey, onClick, onArrowPress }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusKey,
    onClick,
    onArrowPress,
  });

  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function SearchBar() {
  const { search, setSearch } = useContext(AppContext);

  return (
    <Focusable
      focusKey="search-bar"
      onEnterPress={() => {
        const input = document.getElementById("searchInput");
        if (input) {
          input.focus();
          if (window.webOS?.keyboard) window.webOS.keyboard.show();
        }
      }}
      onArrowPress={({ direction }) => {
        if (direction === "down") {
          setTimeout(() => {
            const firstCountryItem = document.querySelector('[data-focus-key^="country-"]');
            if (firstCountryItem) {
              const focusKey = firstCountryItem.getAttribute("data-focus-key");
              if (focusKey) {
                console.log("Trying to focus on:", focusKey);
                setFocus(focusKey);
              }
            } else {
              console.log("No country items found");
            }
          }, 10);
          return true;
        }
        return false;
      }}
    >
      {(focused, { ref }) => {
        useEffect(() => {
          if (focused && ref.current) {
            ref.current.focus();
            if (window.webOS?.keyboard) window.webOS.keyboard.show();
          }
        }, [focused, ref]);

        return (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "100vw", // Prevent overflow
              mx: 0, // Remove horizontal margins
              px: 2, // Add padding for content
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                pl: 1.5,
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <SearchIcon
                sx={{
                  width: 20,
                  height: 20,
                  color: focused ? "#3b82f6" : "#9ca3af",
                  transition: "color 0.2s",
                }}
              />
            </Box>
            <InputBase
              inputRef={ref}
              id="searchInput"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (["Enter", "ArrowDown"].includes(e.key)) e.preventDefault();
              }}
              placeholder="Search..."
              inputProps={{ "aria-label": "Search input" }}
              sx={{
                width: "100%",
                pl: 5,
                pr: 2,
                py: 1.5,
                borderRadius: 2,
                color: "#000000",
                bgcolor: "#ffffff",
                border: `2px solid ${focused ? "#3b82f6" : "#4b5563"}`,
                transition: "all 0.2s ease-in-out",
                fontSize: "1rem",
                ...(focused && {
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)",
                  bgcolor: "#f3f4f6",
                }),
                "&:hover": {
                  borderColor: "#6b7280",
                },
                "&:focus": {
                  outline: "none",
                  borderColor: "#3b82f6",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#9ca3af",
                },
              }}
            />
            {search && (
              <IconButton
                onClick={() => setSearch("")}
                aria-label="Clear search"
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  pr: 1.5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ClearIcon
                  sx={{
                    width: 20,
                    height: 20,
                    color: "#9ca3af",
                    "&:hover": {
                      color: "#e5e7eb",
                    },
                    transition: "color 0.2s",
                  }}
                />
              </IconButton>
            )}
          </Box>
        );
      }}
    </Focusable>
  );
}

export default SearchBar;
