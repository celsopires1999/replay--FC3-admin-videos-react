import {
  Category,
  CategoryParams,
  Result,
  Results,
} from "../../types/category";
import { apiSlice } from "../api/apiSlice";

export const initialState = {
  id: "",
  name: "",
  description: "",
  is_active: false,
  deleted_at: null,
  created_at: "",
  updated_at: "",
};

const endpointUrl = "/categories";

function getCategories({ page = 1, per_page = 10, search = "" }) {
  // const params = { page, per_page, search, is_active: false };
  const params = { page, per_page, search, is_active: undefined };

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

function getCategory(id: string) {
  return `${endpointUrl}/${id}`;
}

function createCategory(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category,
  };
}

function updateCategory(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function deleteCategory(id: string) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, string>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategory,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategory,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<void, string>({
      query: deleteCategory,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
