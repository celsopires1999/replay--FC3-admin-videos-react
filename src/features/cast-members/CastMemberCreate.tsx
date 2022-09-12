import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CastMember } from "./../../types/cast-member";
import { initialState, useCreateCastMemberMutation } from "./castMemberSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export function CastMemberCreate() {
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [createCastMember, createCastMemberStatus] =
    useCreateCastMemberMutation();
  const { enqueueSnackbar } = useSnackbar();

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
    await createCastMember(castMemberState);
  }

  useEffect(() => {
    if (createCastMemberStatus.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: "success" });
    }

    if (createCastMemberStatus.error) {
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [
    createCastMemberStatus.error,
    createCastMemberStatus.isSuccess,
    enqueueSnackbar,
  ]);

  return (
    <Box>
      <CastMemberForm
        castMember={castMemberState}
        isLoading={createCastMemberStatus.isLoading}
        isDisabled={createCastMemberStatus.isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleToggle={handleToggle}
      >
        Create Cast Member
      </CastMemberForm>
    </Box>
  );
}
