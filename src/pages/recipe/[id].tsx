import { RecipeForm as RecipeComponent } from "@/components/recipe";
import { api } from "@/lib/api";
import { Recipe } from "@/types";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  const { params } = context;
  const id = Number(params?.id) as Recipe["id"];

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const res = await api.get<Recipe>(`/${id}`);

    return { props: { recipe: res.data } };
  } catch (error) {
    console.error("Error fetching recipe data:", error);

    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{
  recipe: Recipe;
}>;

export default RecipeComponent;

RecipeComponent.withLayout = true;
