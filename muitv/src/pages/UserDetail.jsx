
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const backButtonRef = useRef(null);

  const { ref, focusKey } = useFocusable({
    focusKey: "USER_DETAIL_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "BACK_BUTTON",
  });

  const { ref: backRef, focused: backFocused } = useFocusable({
    focusKey: "BACK_BUTTON",
    isFocusable: true,
    onEnterPress: () => {
      navigate("/users");
    },
  });

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setFocus("BACK_BUTTON");
    }, 100);
  }, []);

  const handleBackClick = () => {
    navigate("/users");
  };

  if (!user)
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", p: { xs: 3, sm: 5 }, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "100vw" }}>
        <Typography sx={{ fontSize: "1.125rem", color: "#f97316", fontWeight: 500 }}>
          Loading...
        </Typography>
      </Box>
    );

  return (
    <FocusContext.Provider value={focusKey}>
      <Box
        ref={ref}
        sx={{
          minHeight: "100vh",
          bgcolor: "#ffffff",
          p: { xs: 3, sm: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "100vw",
          margin: 0,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 480, mb: 3, px: 2 }}>
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
              transition: "all 0.2s",
              ...(backFocused
                ? {
                    boxShadow: "0 0 8px rgba(249, 115, 22, 0.3)",
                    bgcolor: "#ea580c",
                    transform: "scale(1.05)",
                  }
                : {
                    "&:hover": {
                      bgcolor: "#ea580c",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "0 0 0 2px #f97316",
                    },
                  }),
              textTransform: "none",
            }}
          >
            ← Back to Users
          </Button>
        </Box>

        <Card
          sx={{
            width: "100%",
            maxWidth: 480,
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "2px solid #e5e7eb",
            p: 3,
            transition: "all 0.3s",
            mx: 0, // Remove margins
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              {user.image && (
                <CardMedia
                  component="img"
                  image={user.image}
                  alt={`${user.firstName} ${user.lastName} avatar`}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid #fdba74",
                  }}
                />
              )}
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#f97316" }}>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: "1.125rem" }}>
              <Typography sx={{ color: "#374151" }}>
                <strong style={{ color: "#f97316" }}>Email:</strong> {user.email}
              </Typography>
              <Typography sx={{ color: "#374151" }}>
                <strong style={{ color: "#f97316" }}>Age:</strong> {user.age}
              </Typography>
              <Typography sx={{ color: "#374151" }}>
                <strong style={{ color: "#f97316" }}>Phone:</strong> {user.phone}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </FocusContext.Provider>
  );
}

export default UserDetail;
