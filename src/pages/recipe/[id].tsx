import { RecipeForm as RecipeComponent } from "@/components/recipe";
import { recipeSelectors } from "@/store/recipe";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RecipePage() {
  const recipes = useSelector(recipeSelectors.getRecipeList);

  const router = useRouter();
  const { id } = router.query;

  const recipe = recipes.find((recipe) => recipe.id === Number(id));

  useEffect(() => {
    if (!recipe) {
      router.push("/404");
    }
  }, [recipe, router]);

  if (!recipe) {
    return null;
  }

  return <RecipeComponent recipe={recipe} />;
}

RecipePage.withLayout = true;
