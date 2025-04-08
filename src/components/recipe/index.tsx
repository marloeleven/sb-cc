import { FlexBox } from "../flexbox";

export function Recipe() {
  return (
    <FlexBox
      column
      sx={{
        gap: 3,
        overflowY: "auto",
        maxHeight: "70vh",
        px: 1,
      }}
    >
      Add your recipe content here
    </FlexBox>
  );
}
