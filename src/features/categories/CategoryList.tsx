import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSlotsComponentsProps,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCategories,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

type GridRowProps = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export function CategoryList() {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [pageSize, setPageSize] = useState<number>(10);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const rows: GridRowProps[] = data
    ? data.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
      }))
    : [];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      type: "string",
      renderCell: renderNameCell,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      type: "string",
    },

    {
      field: "is_active",
      headerName: "Active?",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },

    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      type: "string",
    },

    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      type: "string",
      renderCell: renderActionsCell,
    },
  ];

  const componentsProps: GridSlotsComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };
  function renderIsActiveCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <IconButton
        aria-label="delete"
        color="secondary"
        onClick={() => handleDelete(rowData.value)}
      >
        <DeleteIcon />
      </IconButton>
    );
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

  function renderNameCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color={"primary"}>{rowData.value}</Typography>
      </Link>
    );
  }

  function handleOnPageSizeChange(_pageSize: number): void {
    setPageSize(_pageSize);
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
      {/* Table */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          pageSize={pageSize}
          columns={columns}
          disableSelectionOnClick
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          componentsProps={componentsProps}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onPageSizeChange={handleOnPageSizeChange}
        />
      </Box>
    </Box>
  );
}
