import type { Recipe } from "@/types";
import { Container } from "@mui/material";
import { Aside } from "./aside";
import { Content } from "./content";

export function Recipe({ recipe }: { recipe?: Recipe } = {}) {
  return (
    <Container
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
        padding: { xs: 0, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 4, md: 4 },
      }}
    >
      <Aside recipe={recipe} />

      <Content recipe={recipe} />
    </Container>
  );
}

Recipe.withLayout = true;
