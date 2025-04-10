import { Aside } from "@/components/home/aside";
import { Container } from "@mui/material";
import { Content } from "./content";

export function Home() {
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
        py: { xs: 0, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 4, md: 0 },
      }}
    >
      <Container
        component="aside"
        sx={{
          maxWidth: {
            xs: "100%",
            md: 306,
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <Aside />
      </Container>
      <Container
        component="section"
        sx={{
          flexGrow: 1,
        }}
      >
        <Content />
      </Container>
    </Container>
  );
}
