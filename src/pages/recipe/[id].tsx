import { Recipe as RecipeComponent } from "@/components/recipe";
import { api } from "@/lib/api";
import { Recipe } from "@/types";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  const { params } = context;
  const id = Number(params?.id) as Recipe["id"];

  if (!id) {
    throw new Error("No recipe id provided");
  }

  const res = await api.get<Recipe>(`/${id}`);
  if (res.status !== 200) {
    // throw new Error("Failed to fetch recipe data");
    return {
      notFound: true,
    };
  }

  return { props: { recipe: res.data } };
}) satisfies GetServerSideProps<{
  recipe: Recipe;
}>;

export default function EditRecipePage({ recipe }: { recipe: Recipe }) {
  return <RecipeComponent recipe={recipe} />;
}

EditRecipePage.withLayout = true;
