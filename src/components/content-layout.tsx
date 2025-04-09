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
        padding: 0,
      }}
    >
      <Container
        component="aside"
        sx={{
          maxWidth: {
            xs: "100%",
            sm: 306,
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
