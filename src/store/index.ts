import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { recipeSlice } from "./recipe";

export const store = configureStore({
  reducer: combineSlices(recipeSlice),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
