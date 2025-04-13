import { FilterFavorites, Recipe, SortType } from "@/types";
import { AlertColor } from "@mui/material";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extraReducers } from "./recipe-actions";

export interface Notification {
  id: number;
  message: string;
  type: AlertColor;
  duration?: number;
}

export interface RecipeState {
  recipes: Recipe[];
  notifications: Notification[];
  filter: {
    search: string;
    sort: SortType | "";
    favorites: Record<Exclude<FilterFavorites, "ALL">, boolean>;
  };
  status: "idle" | "loading" | "failed";
}
const createAppSelector = createSelector.withTypes<RecipeState>();

const initialState: RecipeState = {
  recipes: [],
  notifications: [],
  filter: {
    search: "",
    sort: "",
    favorites: {
      YES: false,
      NO: false,
    },
  },
  status: "idle",
};

const selector = {
  getRecipeList: (state: RecipeState) => state.recipes,
  getFilter: (state: RecipeState) => state.filter,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe(state, { payload }: PayloadAction<Recipe>) {
      state.recipes.push(payload);
    },
    removeRecipe(state, { payload }: PayloadAction<Recipe["id"]>) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== payload);
    },
    updateRecipe(state, { payload }: PayloadAction<Recipe>) {
      state.recipes = state.recipes.map((recipe) => {
        if (recipe.id === payload.id) {
          return { ...recipe, ...payload };
        }

        return recipe;
      });
    },
    setRecipes(state, { payload }: PayloadAction<Recipe[]>) {
      state.recipes = payload;
      state.status = "idle";
    },
    setSearch(state, { payload }: PayloadAction<string>) {
      state.filter.search = payload;
    },
    setSort(state, { payload }: PayloadAction<SortType>) {
      state.filter.sort = payload;
    },
    toggleFavorite(state, { payload }: PayloadAction<Recipe["id"]>) {
      state.recipes = state.recipes.map((recipe) => {
        if (recipe.id === payload) {
          return { ...recipe, isFavorite: !recipe.isFavorite };
        }

        return recipe;
      });
    },
    setFilterFavorites(
      state,
      {
        payload: { type, checked },
      }: PayloadAction<{
        type: Exclude<FilterFavorites, "ALL">;
        checked: boolean;
      }>
    ) {
      state.filter.favorites[type] = checked;
    },
    removeNotification(state, { payload }: PayloadAction<Notification["id"]>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload
      );
    },
  },
  selectors: {
    getRecipeList: createSelector(
      [selector.getRecipeList, selector.getFilter],
      (recipes, filter) => {
        const filterResult = recipes.filter((recipe) => {
          if (!(filter.favorites.YES && filter.favorites.NO)) {
            if (filter.favorites.YES && !recipe.isFavorite) {
              return false;
            }

            if (filter.favorites.NO && recipe.isFavorite) {
              return false;
            }
          }

          if (
            filter.search.trim() &&
            !recipe.title.toLowerCase().includes(filter.search.toLowerCase())
          ) {
            return false;
          }

          return true;
        });

        if (filter.sort) {
          return filterResult.sort((a, b) => {
            if (filter.sort === "ASC") {
              return a.title.localeCompare(b.title);
            }

            return b.title.localeCompare(a.title);
          });
        }

        return filterResult;
      }
    ),
    getFilterSearch: createAppSelector(
      [selector.getFilter],
      (filter) => filter.search
    ),
    getFilterSort: createAppSelector(
      [selector.getFilter],
      (filter) => filter.sort
    ),
    getFilterFavorites: createAppSelector(
      [selector.getFilter],
      (filter) => filter.favorites
    ),
    isLoading: createAppSelector(
      (state: RecipeState) => state.status,
      (status) => status === "loading"
    ),
    getNotifications: (state: RecipeState) => state.notifications,
  },
  extraReducers,
});

export const recipeActions = recipeSlice.actions;
export const recipeSelectors = recipeSlice.selectors;
