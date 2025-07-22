import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Focusable({ onEnterPress, children, focusKey, onClick, onArrowPress }) {
  const { ref, focused } = useFocusable({ 
    onEnterPress, 
    focusKey,
    onArrowPress,
    onClick
  });
  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function Header() {
  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "header-nav",
    trackChildren: true,
    preferredChildFocusKey: "nav-country",
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(17, 24, 39, 0.8)", // bg-gray-900/80
        backdropFilter: "blur(8px)", // backdrop-blur-md
        px: 4, // px-8
        py: 2.5, // py-5
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // shadow-lg
        borderBottom: "1px solid #374151", // border-b border-gray-700
        width: "100%", // Ensure full width
        maxWidth: "100vw", // Prevent overflow
        margin: 0, // Remove default margins
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800, // font-extrabold
            color: "#ffffff", // text-white
            letterSpacing: "-0.025em", // tracking-tight
          }}
        >
          Country & User App
        </Typography>

        {isLoggedIn && (
          <FocusContext.Provider value={focusKey}>
            <Box component="nav" ref={ref} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Focusable 
                onEnterPress={() => navigate("/country")} 
                focusKey="nav-country"
                onArrowPress={({ direction }) => {
                  if (direction === "down") {
                    setTimeout(() => {
                      const firstItem = document.querySelector('[data-focus-key^="user-"]');
                      if (firstItem) {
                        const focusKey = firstItem.getAttribute("data-focus-key");
                        if (focusKey) setFocus(focusKey);
                      }
                    }, 10);
                    return true;
                  }
                  return false;
                }}
              >
                {(focused, { ref }) => (
                  <Button
                    ref={ref}
                    onClick={() => navigate("/country")}
                    sx={{
                      px: 3,
                      py: 1.25,
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      backgroundColor: focused
                        ? "linear-gradient(to right, #3b82f6, #06b6d4)"
                        : "#1f2937",
                      textTransform: "none",
                      transition: "all 0.2s ease-in-out",
                      ...(focused
                        ? {
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2), 0 0 0 2px #60a5fa",
                            transform: "scale(1.05)",
                          }
                        : {
                            color: "#93c5fd",
                            "&:hover": {
                              backgroundColor: "rgba(31, 41, 55, 0.8)",
                            },
                          }),
                    }}
                  >
                    Countries
                  </Button>
                )}
              </Focusable>

              <Focusable 
                onEnterPress={() => navigate("/users")} 
                focusKey="nav-users"
                onArrowPress={({ direction }) => {
                  if (direction === "down") {
                    setTimeout(() => {
                      const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                      if (firstItem) {
                        const focusKey = firstItem.getAttribute("data-focus-key");
                        if (focusKey) setFocus(focusKey);
                      }
                    }, 10);
                    return true;
                  }
                  return false;
                }}
              >
                {(focused, { ref }) => (
                  <Button
                    ref={ref}
                    onClick={() => navigate("/users")}
                    sx={{
                      px: 3,
                      py: 1.25,
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      backgroundColor: focused
                        ? "linear-gradient(to right, #8b5cf6, #6366f1)"
                        : "#1f2937",
                      textTransform: "none",
                      transition: "all 0.2s ease-in-out",
                      ...(focused
                        ? {
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2), 0 0 0 2px #818cf8",
                            transform: "scale(1.05)",
                          }
                        : {
                            color: "#a5b4fc",
                            "&:hover": {
                              backgroundColor: "rgba(31, 41, 55, 0.8)",
                            },
                          }),
                    }}
                  >
                    Users
                  </Button>
                )}
              </Focusable>

              <Focusable 
                onEnterPress={() => logout(() => navigate("/"))} 
                focusKey="nav-logout"
                onArrowPress={({ direction }) => {
                  if (direction === "down") {
                    setTimeout(() => {
                      const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                      if (firstItem) {
                        const focusKey = firstItem.getAttribute("data-focus-key");
                        if (focusKey) setFocus(focusKey);
                      }
                    }, 10);
                    return true;
                  }
                  return false;
                }}
              >
                {(focused, { ref }) => (
                  <Button
                    ref={ref}
                    onClick={() => logout(() => navigate("/"))}
                    sx={{
                      px: 3,
                      py: 1.25,
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      backgroundColor: focused
                        ? "linear-gradient(to right, #ef4444, #ec4899)"
                        : "rgba(239, 68, 68, 0.9)",
                      textTransform: "none",
                      transition: "all 0.2s ease-in-out",
                      ...(focused
                        ? {
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2), 0 0 0 2px #f87171",
                            transform: "scale(1.05)",
                          }
                        : {
                            "&:hover": {
                              backgroundColor: "#b91c1c",
                            },
                          }),
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Focusable>
            </Box>
          </FocusContext.Provider>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Header);
