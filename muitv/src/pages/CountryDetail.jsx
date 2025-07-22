
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  useFocusable,
  setFocus,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";

function CountryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const backButtonRef = useRef(null);

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_DETAIL_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "BACK_BUTTON",
  });

  const { ref: backRef, focusKey: backFocused } = useFocusable({
    focusKey: "BACK_BUTTON",
    isFocusable: true,
    onEnterPress: () => {
      navigate("/country");
    },
  });

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,region,population,flags,subregion,languages,currencies`)
      .then((res) => setCountry(res.data[0]))
      .catch((err) => console.error("Failed to fetch country details", err));
  }, [name]);

  useEffect(() => {
    setTimeout(() => {
      setFocus("BACK_BUTTON");
    }, 100);
  }, []);

  const handleBackClick = () => {
    navigate("/country");
  };

  if (!country) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", color: "#f97316", width: "100%", maxWidth: "100vw" }}>
        <Header />
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, sm: 5 } }}>
          <Typography sx={{ fontSize: "1.125rem", fontWeight: 500, animation: "pulse 1.5s infinite" }}>
            Loading...
          </Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#ffffff",
          color: "#f97316",
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, sm: 5 },
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 600, mb: 3, px: 2 }}>
            <Button
              ref={(el) => {
                backButtonRef.current = el;
                backRef.current = el;
              }}
              onClick={handleBackClick}
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: "#f97316",
                color: "#000000",
                fontWeight: 600,
                borderRadius: 2,
                border: "2px solid #000000",
                "&:hover": {
                  bgcolor: "#ea580c",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 2px #f97316",
                },
                textTransform: "none",
              }}
            >
              ← Back to Countries
            </Button>
          </Box>
          
          <Card
            sx={{
              width: "100%",
              maxWidth: 600,
              bgcolor: "#ffffff",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: 4,
              p: 4,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
              },
              mx: 0, // Remove horizontal margins
            }}
          >
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  textAlign: "center",
                  background: "linear-gradient(to right, #f97316, #ef4444)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "pulse 1.5s infinite",
                }}
              >
                {country.name.common}
              </Typography>
              {country.flags?.png && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    image={country.flags.png}
                    alt={`${country.name.common} flag`}
                    sx={{
                      width: 128,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 2,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>
              )}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: "1.125rem", fontWeight: 500 }}>
                <Typography>
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </Typography>
                <Typography>
                  <strong>Region:</strong> {country.region || "N/A"}
                </Typography>
                <Typography>
                  <strong>Subregion:</strong> {country.subregion || "N/A"}
                </Typography>
                <Typography>
                  <strong>Population:</strong> {country.population.toLocaleString() || "N/A"}
                </Typography>
                <Typography>
                  <strong>Languages:</strong>{" "}
                  {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                </Typography>
                <Typography>
                  <strong>Currencies:</strong>{" "}
                  {country.currencies
                    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`).join(", ")
                    : "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Footer />
      </Box>
    </FocusContext.Provider>
  );
}

export default CountryDetail;