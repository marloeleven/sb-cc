import { FlexBox } from "@/components/flexbox";
import { recipeSelectors } from "@/store/recipe";
import { Add } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RecipeCard } from "./recipe-card";

function AddRecipeButton() {
  const router = useRouter();

  return (
    <IconButton
      onClick={() => router.push("/recipe/add")}
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
        color: "#ffffff",
        backgroundColor: "primary.main",
        "&:hover": {
          backgroundColor: "#3b4a8c",
        },
        zIndex: 1,
      }}
    >
      <Add />
    </IconButton>
  );
}

export function Content() {
  const recipes = useSelector(recipeSelectors.getRecipeList);

  return (
    <Paper
      sx={{
        p: 4,
        pr: 2,
        borderRadius: 5,
        border: "none",
        boxShadow: 3,
        position: "relative",
        minWidth: 470,
      }}
      className="container"
    >
      <AddRecipeButton />
      <FlexBox
        column
        sx={{
          gap: 3,
          overflowY: "auto",
          height: "70vh",
          pr: 1,
        }}
      >
        {!!recipes.length &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}

        {!recipes.length && (
          <FlexBox
            column
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              No Record Found!
            </Typography>
          </FlexBox>
        )}
      </FlexBox>
    </Paper>
  );
}
