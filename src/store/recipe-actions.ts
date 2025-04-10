import { api } from "@/lib/api";
import { Recipe } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type RecipeFormData = Omit<Recipe, "id" | "createdAt" | "isFavorite">;

export type NewRecipe = RecipeFormData & {
  image: File;
};

export const createNewRecipe = createAsyncThunk<Recipe, NewRecipe>(
  "recipe/createRecipe",
  async (recipe: NewRecipe, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const { image, ...rest } = recipe;
      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("image", image);

      const response = await api.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to create recipe");
    }
  }
);

export const getRecipes = createAsyncThunk<Recipe[]>(
  "recipe/getRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/");

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to get recipes");
    }
  }
);
