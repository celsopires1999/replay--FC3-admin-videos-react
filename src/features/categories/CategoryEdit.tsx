import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CategoryForm } from "./components/CategoryForm";
import { Category, selectCategoryById, updateCategory } from "./categorySlice";
import { useSnackbar } from "notistack";

export function CategoryEdit() {
  const id = useParams().id || "";
  const category = useAppSelector((state) => selectCategoryById(state, id));
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [categoryState, setCategoryState] = useState<Category>(category);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(updateCategory(categoryState));
    enqueueSnackbar("Category updated successfully", { variant: "success" });
  }

  return (
    <Box>
      <CategoryForm
        category={categoryState}
        isLoading={false}
        isDisabled={isDisabled}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleToggle={handleToggle}
      >
        Edit Category
      </CategoryForm>
    </Box>
  );
}
