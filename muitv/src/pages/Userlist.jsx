
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import { Box, List, ListItem, ListItemText, CardMedia, Typography } from "@mui/material";

function Focusable({ onEnterPress, children, focusKey, onClick, isFirstItem = false }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusKey,
    onClick,
    onArrowPress: ({ direction }) => {
      if (direction === "up" && isFirstItem) {
        setFocus("nav-logout");
        return true;
      }
      return false;
    },
  });

  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function FocusableList({ children }) {
  return (
    <List
      sx={{
        display: "grid",
        gap: 2,
        width: "100%",
        maxWidth: "100vw",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "1fr" },
        px: 0, // Remove padding
        mx: 0, // Remove margins
        outline: "none",
      }}
    >
      {children}
    </List>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { ref, focusKey } = useFocusable({ 
    focusKey: "USER_PAGE", 
    trackChildren: true,
    preferredChildFocusKey: "header-nav",
  });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFocus("header-nav");
    }, 300);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <Box
        ref={ref}
        sx={{
          bgcolor: "#ffffff",
          minHeight: "100vh",
          color: "#f97316",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: "100vw",
          margin: 0,
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2, // Reduced padding
            width: "100%",
          }}
        >
          {loading ? (
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#000000", animation: "pulse 1.5s infinite" }}>
              Loading users...
            </Typography>
          ) : (
            <FocusableList>
              {users.map((user, index) => {
                const goToDetail = () => navigate(`/user/${user.id}`);

                return (
                  <Focusable
                    key={user.id}
                    focusKey={`user-${user.id}`}
                    onEnterPress={goToDetail}
                    onClick={goToDetail}
                    isFirstItem={index === 0}
                  >
                    {(focused, { ref }) => (
                      <ListItem
                        ref={ref}
                        data-focus-key={`user-${user.id}`}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "#ffffff",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          border: `2px solid ${focused ? "#f97316" : "#e5e7eb"}`,
                          cursor: "pointer",
                          transition: "all 0.3s",
                          "&:hover": {
                            borderColor: "#fb923c",
                            bgcolor: "#f9fafb",
                            transform: "scale(1.05)",
                          },
                          ...(focused && {
                            borderColor: "#f97316",
                            boxShadow: "0 0 8px rgba(249, 115, 22, 0.3)",
                            bgcolor: "linear-gradient(to right, #fefce8, #f3f4f6)",
                            transform: "scale(1.05)",
                          }),
                          width: "100%", // Ensure full width
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                          {user.image && (
                            <CardMedia
                              component="img"
                              image={user.image}
                              alt={`${user.firstName} ${user.lastName} avatar`}
                              sx={{ width: 48, height: 32, objectFit: "cover", borderRadius: 1 }}
                            />
                          )}
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            primaryTypographyProps={{ color: "#f97316", fontWeight: 600, fontSize: "1.125rem" }}
                          />
                        </Box>
                      </ListItem>
                    )}
                  </Focusable>
                );
              })}
            </FocusableList>
          )}
        </Box>
        <Footer />
      </Box>
    </FocusContext.Provider>
  );
}

export default UserList;
