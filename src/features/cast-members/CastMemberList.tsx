import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./castMemberSlice";
import { CastMembersTable } from "./components/CastMembersTable";

const initialOptions = {
  page: 1,
  per_page: 10,
  rowsPerPage: [10, 20, 30],
  search: "",
};

export function CastMemberList() {
  const [options, setOptions] = useState(initialOptions);
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();
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

  async function handleDeleteCastMember(id: string): Promise<void> {
    await deleteCastMember(id);
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast Member deleted successfully", {
        variant: "success",
      });
    }
    if (deleteCastMemberStatus.error) {
      enqueueSnackbar("Error deleting cast member", { variant: "error" });
    }
  }, [
    deleteCastMemberStatus.error,
    deleteCastMemberStatus.isSuccess,
    enqueueSnackbar,
  ]);

  if (error) {
    return <Typography>Error on fetching cast members</Typography>;
  }

  return (
    <Box>
      {/* New Cast Member Button */}
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          sx={{ mb: "1rem" }}
        >
          New Cast Member
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        isFetching={isFetching}
        perPage={options.per_page}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
