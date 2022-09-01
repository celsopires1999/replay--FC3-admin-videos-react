import { Button } from "@mui/material";
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

export function CategoryList() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const rowsPerPage: number[] = [10, 25, 50, 100];

  const options = { per_page: perPage, page, search };

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(_page: number): void {
    setPage(_page + 1);
  }

  function handleFilterChange(filterModel: GridFilterModel): void {
    if (filterModel.quickFilterValues?.length) {
      const _search = filterModel.quickFilterValues.join(" ");
      setSearch(_search);
    } else {
      setSearch("");
    }
  }

  function handleOnPageSizeChange(pageSize: number): void {
    setPerPage(pageSize);
  }

  async function handleDelete(id: string): Promise<void> {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Error deleting category", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

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
        perPage={perPage}
        isFetching={isFetching}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDelete}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
