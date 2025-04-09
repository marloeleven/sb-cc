import { Container } from "@mui/material";

interface Props {
  aside: React.ReactNode;
  content: React.ReactNode;
}
export function ContentLayout({ aside, content }: Props) {
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
        padding: { xs: 0, md: 4 },
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
        {aside}
      </Container>
      <Container
        component="section"
        sx={{
          flexGrow: 1,
        }}
      >
        {content}
      </Container>
    </Container>
  );
}
