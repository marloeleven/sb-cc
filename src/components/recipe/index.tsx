import type { Recipe } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { AppDispatch } from "@/store";
import {
  createNewRecipe,
  NewRecipe,
  RecipeFormData,
  updateRecipe,
} from "@/store/recipe-actions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Aside } from "./aside";
import { Content } from "./content";

const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup
      .string()
      .matches(strictEmailRegex, "Email is not valid")
      .required(),
    title: yup.string().required(),
    description: yup.string().required(),
    ingredients: yup.string().required(),
    instructions: yup.string().required(),
    image: yup.mixed().required("An image file is required"),
  })
  .required();

interface RecipeFormProps {
  recipe?: Recipe;
}
export function RecipeForm({ recipe }: RecipeFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeFormData>({
    defaultValues: {
      name: recipe?.name || "",
      email: recipe?.email || "",
      title: recipe?.title || "",
      description: recipe?.description || "",
      ingredients: recipe?.ingredients || "",
      instructions: recipe?.instructions || "",
      image: recipe?.image || "",
    },
    // @ts-ignore - ignore mixed type error for now
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (recipe?.id) {
      const result = await dispatch(
        updateRecipe({ ...recipe, ...data } as Recipe)
      );

      if (updateRecipe.fulfilled.match(result)) {
        route.push("/");
        return;
      }
      return;
    }

    const result = await dispatch(createNewRecipe(data as NewRecipe));

    if (createNewRecipe.fulfilled.match(result)) {
      route.push("/");
      return;
    }
  };

  return (
    <Container
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
        padding: { xs: 0, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 4, md: 4 },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Aside recipe={recipe} errors={errors} control={control} />

      <Content recipe={recipe} errors={errors} control={control} />
    </Container>
  );
}

RecipeForm.withLayout = true;
