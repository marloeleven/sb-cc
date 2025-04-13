import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { recipeSlice } from "./recipe";

const rootState = combineSlices(recipeSlice);
export const store = configureStore({
  reducer: rootState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
