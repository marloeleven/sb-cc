import { RecipeForm as RecipeComponent } from "@/components/recipe";
import { RootState } from "@/store";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState, props: { id: number }) => {
  const recipe = state.recipe.recipes.find((recipe) => recipe.id === props.id);
  return {
    recipe,
  };
};

const EnhancedRecipeComponent = connect(mapStateToProps)(RecipeComponent);
export default function RecipePage({ id }: { id: number }) {
  return <EnhancedRecipeComponent id={id} />;
}

RecipePage.getInitialProps = async (ctx: { query: { id: string } }) => {
  const { id } = ctx.query;
  return { id: Number(id) };
};

RecipePage.withLayout = true;
