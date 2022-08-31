import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
