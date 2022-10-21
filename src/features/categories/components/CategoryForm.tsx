import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "./../../../types/category";

type Props = {
  category: Category;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

export function CategoryForm({
  category,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
  handleToggle,
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
                  value={category.name}
                  onChange={handleChange}
                  disabled={isDisabled || isLoading}
                />
              </FormControl>
            </Grid>

            {/* Description field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  name="description"
                  label="Description"
                  value={category.description}
                  multiline
                  rows={4}
                  onChange={handleChange}
                  disabled={isDisabled || isLoading}
                />
              </FormControl>
            </Grid>
            {/* Is Active field */}
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name="is_active"
                      color="secondary"
                      inputProps={{ "aria-label": "controlled" }}
                      checked={category.is_active}
                      onChange={handleToggle}
                      disabled={isDisabled || isLoading}
                    />
                  }
                  label="Active"
                />
              </FormGroup>
            </Grid>
            {/* Buttons */}
            <Grid item xs={12}>
              <Box display={"flex"} gap={2}>
                {/* Back */}
                <Button variant="contained" component={Link} to="/">
                  Back
                </Button>
                {/* Save */}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isDisabled || isLoading}
                >
                  {isLoading ? "Loading..." : "Save"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}
