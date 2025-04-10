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

export interface RootState {
  recipes: Recipe[];
  notifications: Notification[];
  filter: {
    search: string;
    sort: SortType | "";
    favorites: Record<Exclude<FilterFavorites, "ALL">, boolean>;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
}
const createAppSelector = createSelector.withTypes<RootState>();

const initialState: RootState = {
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
  getRecipeList: (state: RootState) => state.recipes,
  getFilter: (state: RootState) => state.filter,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, { payload }: PayloadAction<Recipe[]>) {
      state.recipes = payload;
    },
    addRecipe(state, { payload }: PayloadAction<Recipe>) {
      // should be called by thunk response
      state.recipes.push(payload);
    },
    removeRecipe(state, { payload }: PayloadAction<Recipe["id"]>) {
      // should be called by thunk response
      state.recipes = state.recipes.filter((recipe) => recipe.id !== payload);
    },
    updateRecipe(
      state,
      {
        payload: { id, ...data },
      }: PayloadAction<Pick<Recipe, "id"> & Partial<Recipe>>
    ) {
      // should be called by thunk response
      state.recipes = state.recipes.map((recipe) => {
        if (recipe.id === id) {
          return { ...recipe, ...data };
        }

        return recipe;
      });
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
    addNotification(
      state,
      { payload }: PayloadAction<Omit<Notification, "id">>
    ) {
      const id = Date.now();
      state.notifications.push({ ...payload, id });
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
    getRecipeById: createAppSelector(
      [selector.getRecipeList, (_state, id: Recipe["id"]) => id],
      (recipes, id) => recipes.find((recipe) => recipe.id === id)
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
      (state: RootState) => state.status,
      (status) => status === "loading"
    ),
    getNotifications: (state: RootState) => state.notifications,
  },
  extraReducers,
});

export const recipeActions = recipeSlice.actions;
export const recipeSelectors = recipeSlice.selectors;
