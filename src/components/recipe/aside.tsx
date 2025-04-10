import type { Recipe } from "@/types";
import { ChevronLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import type { RecipeFormData } from ".";
import { FlexBox } from "../flexbox";
import { ImageLoader } from "../image-loader";

const DEFAULT_IMAGE = "/assets/placeholder.png";
function ImageViewer({
  src,
  onChange,
  hasError,
}: {
  src: Recipe["image"];
  onChange: (file: File) => void;
  hasError?: boolean;
}) {
  const [imagePath, setImagePath] = useState(src);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    onChange(event.target.files![0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePath(event.target!.result as string);
      };
      reader.readAsDataURL(file);
      return;
    }

    setImagePath(DEFAULT_IMAGE);
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
            objectFit: "cover",
            border: hasError ? "1px solid #ff0000" : "none",
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

interface AsideProps {
  recipe?: Recipe;
  errors: FieldErrors<RecipeFormData>;
  control: Control<RecipeFormData, any, FieldValues>;
}

export function Aside({ recipe, errors, control }: AsideProps) {
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

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange } }) => (
          <ImageViewer
            src={recipe?.image || DEFAULT_IMAGE}
            onChange={onChange}
            hasError={!!errors.image}
          />
        )}
      />
    </FlexBox>
  );
}
