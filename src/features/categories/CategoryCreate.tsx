import { Box } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { CategoryForm } from "./CategoryForm";
import { Category, createCategory } from "./categorySlice";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";

export function CategoryCreate() {
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setCategoryState({
      ...categoryState,
      [name]: value,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(createCategory(categoryState));
    enqueueSnackbar("Category created successfully", { variant: "success" });
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
        Create Category
      </CategoryForm>
    </Box>
  );
}
