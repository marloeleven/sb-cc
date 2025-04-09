import type { Recipe } from "@/types";
import { ChevronLeft } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FlexBox } from "../flexbox";

const DEFAULT_IMAGE = "/images/recipe.jpg";
export function Recipe({ recipe }: { recipe?: Recipe } = {}) {
  const [imagePath, setImagePath] = useState(DEFAULT_IMAGE);
  return (
    <Container
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
        padding: { xs: 0, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 4, md: 4 },
      }}
    >
      <FlexBox
        col
        sx={{
          alignItems: "flex-start",
          gap: 4,
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

        <Image src={imagePath} alt="Recipe Image" width={357} height={301} />
      </FlexBox>

      <FlexBox
        col
        sx={{
          flexGrow: 1,
        }}
      >
        {recipe?.title}
      </FlexBox>
    </Container>
  );
}

Recipe.withLayout = true;
