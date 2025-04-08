import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";
interface FlexBoxProps extends BoxProps {
  column?: boolean;
  sx?: BoxProps["sx"];
}

export const FlexBox = styled(Box)<FlexBoxProps>((props) => ({
  display: "flex",
  flexDirection: props.column ? "column" : "row",
}));
