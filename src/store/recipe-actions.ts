import { api } from "@/lib/api";
import { Recipe } from "@/types";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { recipeActions, RecipeState } from "./recipe";

export type RecipeFormData = Omit<Recipe, "id" | "createdAt" | "isFavorite">;

export type NewRecipe = RecipeFormData & {
  image: File;
};

type RejectType = {
  rejectValue: string;
};

export const createNewRecipe = createAsyncThunk<string, NewRecipe, RejectType>(
  "recipe/createRecipe",
  async (recipe: NewRecipe, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(recipe).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await api.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(recipeActions.addRecipe(response.data));

      return "Recipe added successfully";
    } catch (error: unknown) {
      console.error(error);
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Failed to create recipe"
      );
    }
  }
);

export const updateRecipe = createAsyncThunk<string, Recipe, RejectType>(
  "recipe/updateRecipe",
  async (recipe: Recipe, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(recipe).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await api.put(`/${recipe.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(recipeActions.updateRecipe(response.data));

      return "Recipe updated successfully";
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to update recipe");
    }
  }
);

export const deleteRecipe = createAsyncThunk<string, Recipe["id"], RejectType>(
  "recipe/deleteRecipe",
  async (recipeId, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/${recipeId}`);

      dispatch(recipeActions.removeRecipe(recipeId));

      return "Recipe deleted successfully";
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to delete recipe");
    }
  }
);

export const getRecipes = createAsyncThunk<string, void, RejectType>(
  "recipe/getRecipes",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/");

      dispatch(recipeActions.setRecipes(response.data));
      return "";
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to get recipes");
    }
  }
);

const handleStatusUpdate = {
  pending: (state: RecipeState) => {
    state.status = "loading";
  },
  fulfilled: (
    state: RecipeState,
    { payload: message }: PayloadAction<string>
  ) => {
    state.status = "idle";

    state.notifications.push({
      id: Date.now(),
      message,
      type: "success",
      duration: 3000,
    });
  },
  rejected: (
    state: RecipeState,
    { payload: message }: PayloadAction<string | undefined>
  ) => {
    state.status = "failed";

    state.notifications.push({
      id: Date.now(),
      message: message || "An error occurred",
      type: "error",
      duration: 3000,
    });
  },
};

export const extraReducers = (
  builder: ActionReducerMapBuilder<RecipeState>
) => {
  builder
    .addCase(createNewRecipe.pending, handleStatusUpdate.pending)
    .addCase(createNewRecipe.rejected, handleStatusUpdate.rejected)
    .addCase(createNewRecipe.fulfilled, handleStatusUpdate.fulfilled);

  builder
    .addCase(updateRecipe.pending, handleStatusUpdate.pending)
    .addCase(updateRecipe.rejected, handleStatusUpdate.rejected)
    .addCase(updateRecipe.fulfilled, handleStatusUpdate.fulfilled);

  builder
    .addCase(deleteRecipe.pending, handleStatusUpdate.pending)
    .addCase(deleteRecipe.rejected, handleStatusUpdate.rejected)
    .addCase(deleteRecipe.fulfilled, handleStatusUpdate.fulfilled);

  builder
    .addCase(getRecipes.pending, handleStatusUpdate.pending)
    .addCase(getRecipes.rejected, handleStatusUpdate.rejected);
};
