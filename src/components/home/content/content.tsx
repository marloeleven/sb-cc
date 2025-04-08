import { FlexBox } from "@/components/flexbox";
import { testRecipes } from "@/data/data";
import { Paper } from "@mui/material";
import { RecipeCard } from "./recipe-card";

export function Content() {
  return (
    <Paper sx={{ p: 4, pr: 2, borderRadius: 5, border: "none", boxShadow: 3 }}>
      <FlexBox
        column
        sx={{
          gap: 3,
          overflowY: "auto",
          maxHeight: "70vh",
          px: 1,
        }}
      >
        {testRecipes.slice(0, 10).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </FlexBox>
    </Paper>
  );
}
