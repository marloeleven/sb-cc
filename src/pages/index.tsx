import { Home } from "@/components/home";
import { recipeActions } from "@/store/recipe";
import { Recipe } from "@/types";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TempData } from "./api/recipe";

export const getServerSideProps = (async () => {
  return {
    props: {
      recipes: TempData,
    },
  };
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
