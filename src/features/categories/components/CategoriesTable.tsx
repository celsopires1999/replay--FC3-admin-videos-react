import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridSlotsComponentsProps,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results } from "../../../types/category";

export type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

type GridRowProps = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
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

  function renderIsActiveCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

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

  const rows: GridRowProps[] = data ? mapDataToGridRows(data) : [];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  const componentsProps: GridSlotsComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };
  const rowCount = data?.meta.total ?? 0;

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination={true}
        pageSize={perPage}
        rowCount={rowCount}
        loading={isFetching}
        filterMode={"server"}
        paginationMode={"server"}
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        rowsPerPageOptions={rowsPerPage}
        onPageChange={handleOnPageChange}
        componentsProps={componentsProps}
        components={{ Toolbar: GridToolbar }}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
