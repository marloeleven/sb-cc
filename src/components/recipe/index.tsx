import type { Recipe } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAppDispatch } from "@/store";
import {
  createNewRecipe,
  NewRecipe,
  RecipeFormData,
  updateRecipe,
} from "@/store/recipe-actions";
import { useRouter } from "next/router";
import { Aside } from "./aside";
import { Content } from "./content";

const trim = (value: string) => value.trim();
const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const schema = yup
  .object({
    name: yup.string().transform(trim).required(),
    email: yup
      .string()
      .matches(strictEmailRegex, "Email is not valid")
      .transform(trim)
      .required(),
    title: yup.string().transform(trim).required(),
    description: yup.string().transform(trim).required(),
    ingredients: yup.string().transform(trim).required(),
    instructions: yup.string().transform(trim).required(),
    image: yup
      .mixed()
      .test("value", "An image file is required", (value) => !!value)
      .required("An image file is required"),
  })
  .required();

interface RecipeFormProps {
  recipe?: Recipe;
}
export function RecipeForm({ recipe }: RecipeFormProps) {
  const dispatch = useAppDispatch();
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
