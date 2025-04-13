import { FlexBox } from "@/components/flexbox";
import { ImageLoader } from "@/components/image-loader";
import { useAppDispatch } from "@/store";
import { updateRecipe } from "@/store/recipe-actions";
import { Recipe } from "@/types";
import { Star, StarBorderOutlined } from "@mui/icons-material";
import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

interface RecipeProps {
  recipe: Recipe;
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface RecipeImageProps extends Pick<Recipe, "image" | "title"> {
  isFavorite?: boolean;
  toggleFavorite?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
function RecipeImage({
  image: src,
  title: alt,
  isFavorite = false,
  toggleFavorite = () => {},
}: RecipeImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <FlexBox
      sx={{
        position: "relative",
        minWidth: 310,
        height: 224,
      }}
    >
      <ImageLoader
        src={src}
        alt={alt}
        fill
        loading="lazy"
        style={{ objectFit: "cover", borderRadius: 20 }}
        onLoad={() => setIsLoading(false)}
      />

      {!isLoading && (
        <IconButton
          aria-label="favorite"
          size="small"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            color: "#FFFF00",
          }}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <Star fontSize="large" />
          ) : (
            <StarBorderOutlined fontSize="large" />
          )}
        </IconButton>
      )}
    </FlexBox>
  );
}

export function RecipeCard(props: RecipeProps) {
  const [isOverflow, setIsOverflow] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const toggleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    await dispatch(
      updateRecipe({ ...props.recipe, isFavorite: !props.recipe.isFavorite })
    );
  };

  const onEdit = () => {
    router.push(`/recipe/${props.recipe.id}`);
  };

  return (
    <>
      <Paper
        className="recipe-card"
        sx={{
          display: "flex",
          gap: 1,
          borderRadius: 5,
          boxShadow: 3,
          maxHeight: 224,
          cursor: "pointer",
          "&:hover": {
            boxShadow: 6,
          },
        }}
        onClick={onEdit}
      >
        <RecipeImage
          image={props.recipe.image}
          title={props.recipe.title}
          isFavorite={props.recipe.isFavorite}
          toggleFavorite={toggleFavorite}
        />
        <FlexBox
          col
          sx={{
            color: "#000000",
            fontWeight: 600,
            fontSize: 15,
            py: 2,
            px: 2,
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <FlexBox
            col
            sx={{
              alignItems: "flex-start",
              gap: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              {props.recipe.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: 15,
                fontWeight: 600,
                WebkitLineClamp: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                pr: showOverflow ? 0.5 : 0,
                maxHeight: showOverflow ? "110px" : "90px",
                overflowY: showOverflow ? "auto" : "hidden",
              }}
              ref={(divEl) => {
                if (divEl) {
                  setIsOverflow(divEl.scrollHeight > divEl.clientHeight);
                }
              }}
            >
              {props.recipe.description}
            </Typography>

            {isOverflow && !showOverflow && (
              <Button
                variant="text"
                sx={{
                  border: "none",
                  textTransform: "none",
                  color: "#000000",
                  backgroundColor: "transparent",
                  p: 0,
                  transition: "none",
                  animation: "none",
                }}
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowOverflow(true);
                }}
              >
                See more
              </Button>
            )}
          </FlexBox>
          <FlexBox
            className="recipe-card-footer"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              color: "#000000",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Added by: {props.recipe.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Date: {formatDateTime(new Date(props.recipe.createdAt))}
            </Typography>
          </FlexBox>
        </FlexBox>
      </Paper>
      <Divider
        sx={{
          "--mui-palette-divider": "#rgba(0, 0, 0, 0.25)",
        }}
      />
    </>
  );
}
