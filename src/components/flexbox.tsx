import { Box, BoxProps } from "@mui/material";
interface FlexBoxProps extends BoxProps {
  col?: boolean;
}

export function FlexBox({ col, sx, ...props }: FlexBoxProps) {
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        display: "flex",
        flexDirection: col ? "column" : "row",
      }}
    />
  );
}
