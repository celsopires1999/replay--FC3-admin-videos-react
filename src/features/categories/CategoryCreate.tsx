import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Category } from "./../../types/category";
import { initialState, useCreateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export function CategoryCreate() {
  const [categoryState, setCategoryState] = useState<Category>(initialState);
  const [createCategory, createCategoryStatus] = useCreateCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

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
    await createCategory(categoryState);
  }

  useEffect(() => {
    if (createCategoryStatus.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: "success" });
    }

    if (createCategoryStatus.error) {
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [
    createCategoryStatus.error,
    createCategoryStatus.isSuccess,
    enqueueSnackbar,
  ]);

  return (
    <Box>
      <CategoryForm
        category={categoryState}
        isLoading={createCategoryStatus.isLoading}
        isDisabled={createCategoryStatus.isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleToggle={handleToggle}
      >
        Create Category
      </CategoryForm>
    </Box>
  );
}
