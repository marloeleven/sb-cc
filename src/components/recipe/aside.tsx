import type { Recipe } from "@/types";
import { ChevronLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { FlexBox } from "../flexbox";
import { ImageLoader } from "../image-loader";

const DEFAULT_IMAGE = "/assets/placeholder.png";
function ImageViewer({ src }: { src: Recipe["image"] }) {
  const [imagePath, setImagePath] = useState(src);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePath(event.target!.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FlexBox
      sx={{
        position: "relative",
        width: "357px",
        height: "301px",
        cursor: "pointer",
      }}
    >
      <label>
        <ImageLoader
          src={imagePath}
          alt="Recipe Image"
          width={357}
          height={301}
          style={{
            userSelect: "none",
          }}
        />
        <input
          type="file"
          hidden
          accept="image/*"
          name="image"
          onChange={onFileChange}
        />
      </label>
    </FlexBox>
  );
}

export function Aside({ recipe }: { recipe?: Recipe } = {}) {
  return (
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

      <ImageViewer src={recipe?.image || DEFAULT_IMAGE} />
    </FlexBox>
  );
}
