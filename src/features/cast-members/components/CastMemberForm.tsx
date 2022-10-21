import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CastMember } from "./../../../types/cast-member";

type Props = {
  castMember: CastMember;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

export function CastMemberForm({
  castMember,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
  children,
}: Props) {
  return (
    <Paper>
      {/* Main Label */}
      <Box p={2} mb={2}>
        <Typography variant="h4" component="h1">
          {children}
        </Typography>
      </Box>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  name="name"
                  label="Name"
                  value={castMember.name}
                  onChange={handleChange}
                  disabled={isDisabled || isLoading}
                />
              </FormControl>
            </Grid>
            {/* Type field */}
            <Grid item xs={12}>
              <FormGroup>
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="type"
                  name="type"
                  value={castMember.type}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Director"
                    disabled={isDisabled || isLoading}
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Actor"
                    disabled={isDisabled || isLoading}
                  />
                </RadioGroup>
              </FormGroup>
            </Grid>
            {/* Buttons */}
            <Grid item xs={12}>
              <Box display={"flex"} gap={2}>
                {/* Back */}
                <Button variant="contained" component={Link} to="/cast-members">
                  Back
                </Button>
                {/* Save */}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isDisabled || isLoading}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}
