import { Home } from "@/components/home";
import { api } from "@/lib/api";
import { recipeActions } from "@/store/recipe";
import { Recipe } from "@/types";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getServerSideProps = (async () => {
  try {
    const res = await api.get<Recipe[]>(`/`);

    return { props: { recipes: res.data } };
  } catch (error) {
    console.error("Error fetching recipe data:", error);

    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{
  recipes: Recipe[];
}>;

export default function HomePage({ recipes }: { recipes: Recipe[] }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeActions.setRecipes(recipes));
  }, [dispatch, recipes]);

  return <Home />;
}

HomePage.withSearchInput = true;
HomePage.withLayout = true;
