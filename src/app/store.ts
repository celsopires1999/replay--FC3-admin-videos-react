import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { castMemberApiSlice } from "../features/cast-members/castMemberSlice";
import { categoriesApiSlice } from "../features/categories/categorySlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMemberApiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
