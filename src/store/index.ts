import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./recipe";

export const store = configureStore({
  reducer: combineSlices(recipeSlice),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: { recipe: recipeSlice.getInitialState() },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
