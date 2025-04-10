import { Home } from "@/components/home";
import { AppDispatch } from "@/store";
import { getRecipes } from "@/store/recipe-actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return <Home />;
}

HomePage.withSearchInput = true;
HomePage.withLayout = true;
