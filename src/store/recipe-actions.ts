import { api } from "@/lib/api";
import { Recipe } from "@/types";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "./recipe";

export type RecipeFormData = Omit<Recipe, "id" | "createdAt" | "isFavorite">;

export type NewRecipe = RecipeFormData & {
  image: File;
};

export const createNewRecipe = createAsyncThunk<Recipe, NewRecipe>(
  "recipe/createRecipe",
  async (recipe: NewRecipe, { rejectWithValue }) => {
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

      return response.data;
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

export const updateRecipe = createAsyncThunk<Recipe, Recipe>(
  "recipe/updateRecipe",
  async (recipe: Recipe, { rejectWithValue }) => {
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

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to update recipe");
    }
  }
);

export const deleteRecipe = createAsyncThunk<Recipe["id"], Recipe["id"]>(
  "recipe/deleteRecipe",
  async (recipeId, { rejectWithValue }) => {
    try {
      await api.delete(`/${recipeId}`);

      return recipeId;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to delete recipe");
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

export const extraReducers = (builder: ActionReducerMapBuilder<RootState>) => {
  builder
    .addCase(createNewRecipe.pending, (state) => {
      state.status = "loading";
    })
    .addCase(createNewRecipe.rejected, (state, { payload }) => {
      state.status = "failed";

      state.notifications.push({
        id: Date.now(),
        message: "Failed to create recipe",
        type: "error",
        duration: 3000,
      });
    })
    .addCase(createNewRecipe.fulfilled, (state, { payload }) => {
      if (payload) {
        state.status = "succeeded";
        state.recipes.push(payload);

        state.notifications.push({
          id: Date.now(),
          message: "Recipe added successfully",
          type: "success",
          duration: 3000,
        });
      }
    });

  builder
    .addCase(updateRecipe.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updateRecipe.rejected, (state, { payload }) => {
      state.status = "failed";

      state.notifications.push({
        id: Date.now(),
        message: payload as string,
        type: "error",
        duration: 3000,
      });
    })
    .addCase(updateRecipe.fulfilled, (state, { payload }) => {
      if (payload) {
        state.status = "succeeded";
        state.recipes.push(payload);

        state.notifications.push({
          id: Date.now(),
          message: "Recipe updated successfully",
          type: "success",
          duration: 3000,
        });
      }
    });

  builder
    .addCase(deleteRecipe.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteRecipe.rejected, (state, { payload }) => {
      state.status = "failed";
      state.notifications.push({
        id: Date.now(),
        message: payload as string,
        type: "error",
        duration: 3000,
      });
    })
    .addCase(deleteRecipe.fulfilled, (state, { payload }) => {
      if (payload) {
        state.status = "succeeded";
        state.recipes = state.recipes.filter((recipe) => recipe.id !== payload);

        state.notifications.push({
          id: Date.now(),
          message: "Recipe deleted successfully",
          type: "success",
          duration: 3000,
        });
      }
    });

  builder
    .addCase(getRecipes.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getRecipes.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.recipes = payload;
    });
};
