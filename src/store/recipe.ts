import { FilterFavorites, Recipe, SortType } from "@/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RootState {
  recipes: Recipe[];
  filter: {
    search: string;
    sort: SortType | "";
    favorites: Record<Exclude<FilterFavorites, "ALL">, boolean>;
  };
}
const createAppSelector = createSelector.withTypes<RootState>();

const initialState: RootState = {
  recipes: [],
  filter: {
    search: "",
    sort: "",
    favorites: {
      YES: false,
      NO: false,
    },
  },
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
  },
});

export const recipeActions = recipeSlice.actions;
export const recipeSelectors = recipeSlice.selectors;
