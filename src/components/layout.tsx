import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { SearchInput } from "./search-input";

interface Props extends PropsWithChildren {
  children: React.ReactNode;
  withSearchInput?: boolean;
}
export function Layout({ children, withSearchInput = false }: Props) {
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100vh",
        px: 0,
      }}
    >
      <Grid
        size={12}
        sx={{
          backgroundColor: "primary.main",
          padding: 1,
          justifyContent: "flex-end",
          display: "flex",
          height: "96px",
          alignItems: "center",
        }}
      >
        {withSearchInput && <SearchInput />}
      </Grid>
      <Grid
        size={12}
        flex={1}
        sx={{
          padding: { sm: "10px", md: "10px 55px" },
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
