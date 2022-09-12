import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastMember } from "./../../types/cast-member";
import {
  initialState,
  useGetCastMemberQuery,
  useUpdateCastMemberMutation,
} from "./castMemberSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export function CastMemberEdit() {
  const id = useParams().id || "";
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: category,
    isFetching,
    isLoading,
    error,
  } = useGetCastMemberQuery(id);

  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  const [updateCastMember, updateCastMemberStatus] =
    useUpdateCastMemberMutation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, checked } = e.target;
    setCastMemberState({ ...castMemberState, [name]: checked });
  }
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    updateCastMember(castMemberState);
  }

  useEffect(() => {
    if (updateCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast Member updated successfully", {
        variant: "success",
      });
    }

    if (updateCastMemberStatus.isError) {
      enqueueSnackbar("Cast Member not updated", { variant: "error" });
    }
  }, [
    enqueueSnackbar,
    updateCastMemberStatus.isError,
    updateCastMemberStatus.isSuccess,
  ]);

  useEffect(() => {
    if (category) {
      setCastMemberState(category.data);
    }
  }, [category]);

  if (error) {
    return <Typography>Error fetching cast member</Typography>;
  }

  return (
    <Box>
      <CastMemberForm
        castMember={castMemberState}
        isLoading={updateCastMemberStatus.isLoading || isLoading}
        isDisabled={updateCastMemberStatus.isLoading || isFetching}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleToggle={handleToggle}
      >
        Edit Category
      </CastMemberForm>
    </Box>
  );
}
