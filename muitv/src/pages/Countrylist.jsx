
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import SearchBar from "../component/SearchBar";
import { AppContext } from "../context/AppContext";
import { Box, List, ListItem, ListItemText, CardMedia, Typography } from "@mui/material";

function Focusable({ onEnterPress, children, focusKey, onClick, isFirstItem = false }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusKey,
    onClick,
    onArrowPress: ({ direction }) => {
      if (direction === "up" && isFirstItem) {
        setFocus("search-bar");
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
        maxWidth: "100vw", // Prevent overflow
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        outline: "none",
        px: 0, // Remove padding to use full width
        mx: 0, // Remove margins
      }}
    >
      {children}
    </List>
  );
}

function CountryList() {
  const [countries, setCountries] = useState([]);
  const { search } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "search-bar",
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch countries", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFocus("search-bar");
    }, 300);
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

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
        <SearchBar />
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
              Loading countries...
            </Typography>
          ) : (
            <FocusableList>
              {filteredCountries.map((country, index) => {
                const goToDetail = () => navigate(`/country/${country.name?.common}`);
                const focusId = country.cca2 || country.name?.common || `country-${index}`;

                return (
                  <Focusable
                    key={focusId}
                    focusKey={`country-${focusId}`}
                    onEnterPress={goToDetail}
                    onClick={goToDetail}
                    isFirstItem={index === 0}
                  >
                    {(focused, { ref }) => (
                      <ListItem
                        ref={ref}
                        data-focus-key={`country-${focusId}`}
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
                          {country.flags?.png && (
                            <CardMedia
                              component="img"
                              image={country.flags.png}
                              alt={`${country.name?.common} flag`}
                              sx={{ width: 48, height: 32, objectFit: "cover", borderRadius: 1 }}
                            />
                          )}
                          <ListItemText
                            primary={country.name?.common || "Unnamed Country"}
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

export default CountryList;