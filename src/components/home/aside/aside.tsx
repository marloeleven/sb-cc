import { Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Filter } from "./filter";

// class mismatch workaround
const Sort = dynamic(() => import("./sort"), {
  ssr: false,
});

function TitleBar({ children }: PropsWithChildren) {
  return <Typography variant="h6">{children}</Typography>;
}

export function Aside() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 12,
      }}
    >
      <Sort>
        <TitleBar>Sort by Title</TitleBar>
      </Sort>

      <Filter>
        <TitleBar>Filter</TitleBar>
      </Filter>
    </Container>
  );
}
