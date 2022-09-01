import { createSlice } from "@reduxjs/toolkit";
import { queryAllByAltText } from "@testing-library/react";
import { RootState } from "../../app/store";
import { CategoryParams, Results } from "../../types/category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<void, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

function getCategories({ page = 1, per_page = 10, search = "" }) {
  const params = { page, per_page, search, is_active: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function parseQueryParams(params: CategoryParams): string {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.per_page && query.append("per_page", params.per_page.toString());
  params.search && query.append("search", params.search.toString());
  params.is_active && query.append("is_active", params.is_active.toString());

  return query.toString();
}

const dummyData: Category = {
  id: "016b3829-dad3-4466-b211-7bc771843869",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:59+0000",
  updated_at: "2022-08-15T10:59:59+0000",
};

export const initialState = [
  dummyData,
  {
    ...dummyData,
    id: "116b3829-dad3-4466-b211-7bc771843869",
    name: "Peach",
  },
  {
    ...dummyData,
    id: "216b3829-dad3-4466-b211-7bc771843869",
    name: "Apple",
    is_active: false,
  },
  {
    ...dummyData,
    id: "316b3829-dad3-4466-b211-7bc771843869",
    name: "Banana",
    description: "Banana da boa",
  },
  {
    ...dummyData,
    id: "416b3829-dad3-4466-b211-7bc771843869",
    name: "Orange",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },

    updateCategory(state, action) {
      const index = state.findIndex((c) => c.id === action.payload.id);

      if (index === -1) {
        throw new Error(`Cannot find category with id " ${action.payload.id}.`);
      }

      state[index] = action.payload;
    },

    deleteCategory(state, action) {
      const index = state.findIndex((c) => c.id === action.payload);

      if (index === -1) {
        throw new Error(`Cannot find category with id " ${action.payload}.`);
      }

      state.splice(index, 1);
    },
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((c) => c.id === id);

  return (
    category ?? {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: "",
      created_at: "",
      updated_at: "",
    }
  );
};

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice;
// Extract the action creators object and the reducer
const { actions, reducer } = categoriesSlice;
// Extract and export each action creator by name
export const { createCategory, updateCategory, deleteCategory } = actions;
// Export the reducer, either as a default or named export
export default reducer;
