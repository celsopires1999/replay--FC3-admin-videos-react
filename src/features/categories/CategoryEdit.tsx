import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "./../../types/category";
import {
  initialState,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export function CategoryEdit() {
  const id = useParams().id || "";
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: category,
    isFetching,
    isLoading,
    error,
  } = useGetCategoryQuery(id);

  const [categoryState, setCategoryState] = useState<Category>(initialState);

  const [updateCategory, updateCategoryStatus] = useUpdateCategoryMutation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  }
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    updateCategory(categoryState);
  }

  useEffect(() => {
    if (updateCategoryStatus.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
    }

    if (updateCategoryStatus.isError) {
      enqueueSnackbar("Category not updated", { variant: "error" });
    }
  }, [
    enqueueSnackbar,
    updateCategoryStatus.isError,
    updateCategoryStatus.isSuccess,
  ]);

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box>
      <CategoryForm
        category={categoryState}
        isLoading={updateCategoryStatus.isLoading || isLoading}
        isDisabled={updateCategoryStatus.isLoading || isFetching}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleToggle={handleToggle}
      >
        Edit Category
      </CategoryForm>
    </Box>
  );
}
