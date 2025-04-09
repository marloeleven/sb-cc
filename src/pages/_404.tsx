import { FlexBox } from "@/components/flexbox";
import { Typography } from "@mui/material";

export default function NotFound() {
  return (
    <FlexBox
      column
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "100%",
      }}
    >
      <Typography variant="h1">Page Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </FlexBox>
  );
}
