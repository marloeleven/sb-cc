import { ChevronLeft } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import Link from "next/link";

export function Aside() {
  return (
    <Container
      sx={{
        maxWidth: {
          xs: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          gap: 1,
          fontSize: 36,
          alignItems: "center",
        }}
      >
        <ChevronLeft sx={{ fontSize: 36, color: "#000000" }} />
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ fontSize: 36, color: "#000000" }}
        >
          Back
        </Typography>
      </Link>
    </Container>
  );
}
