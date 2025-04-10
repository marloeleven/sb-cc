import { Home } from "@/components/home";
import { useAppDispatch } from "@/store";
import { getRecipes } from "@/store/recipe-actions";
import { useEffect } from "react";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return <Home />;
}

HomePage.withSearchInput = true;
HomePage.withLayout = true;
