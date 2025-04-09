import { Home } from "@/components/home";
import { api } from "@/lib/api";
import { recipeActions } from "@/store/recipe";
import { Recipe } from "@/types";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getServerSideProps = (async () => {
  const res = await api.get<Recipe[]>(`/`);
  if (res.status !== 200) {
    // throw new Error("Failed to fetch recipe data");
    return {
      notFound: true,
    };
  }

  return { props: { recipes: res.data } };
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
