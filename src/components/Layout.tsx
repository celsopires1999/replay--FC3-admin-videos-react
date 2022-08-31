import { Container } from "@mui/system";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        color: "white",
        bgcolor: (theme) => theme.palette.grey[900],
      }}
    >
      {children}
    </Container>
  );
}
