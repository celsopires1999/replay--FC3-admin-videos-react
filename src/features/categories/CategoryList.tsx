import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoriesTable";

const initialOptions = {
  page: 1,
  per_page: 10,
  rowsPerPage: [10, 20, 30],
  search: "",
};

export function CategoryList() {
  const [options, setOptions] = useState(initialOptions);
  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number): void {
    setOptions({ ...options, page: page + 1 });
  }

  function handleFilterChange(filterModel: GridFilterModel): void {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join(" ");
      setOptions({ ...options, search });
    } else {
      setOptions({ ...options, search: "" });
    }
  }

  function handleOnPageSizeChange(per_page: number): void {
    setOptions({ ...options, per_page });
  }

  async function handleDeleteCategory(id: string): Promise<void> {
    await deleteCategory(id);
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Error deleting category", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box>
      {/* New Category Button */}
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          sx={{ mb: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
