import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
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
import { Results } from "../../../types/cast-member";

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
  type: number;
  created_at: string;
};

export function CastMembersTable({
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
      field: "type",
      headerName: "Type",
      flex: 1,
      type: "string",
      renderCell: renderTypeCell,
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

  function renderTypeCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <Typography color="primary">
        {rowData.value === 1 ? "Director" : "Actor"}
      </Typography>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/cast-members/edit/${rowData.id}`}
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
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
      created_at: new Date(castMember.created_at).toLocaleDateString("pt-BR"),
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
