import { Box, FormControl, MenuItem, styled } from "@mui/material";
import Select from "@mui/material/Select";
import { PropsWithChildren } from "react";

const Placeholder = styled("span")(({ theme }) => ({
  color: "#616161",
  fontSize: 21,
}));

const SORT = ["ASC", "DESC"] as const;
type TSort = (typeof SORT)[keyof typeof SORT];

export default function Sort({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        width: "100%",
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}

      <FormControl fullWidth>
        <Select
          defaultValue={""}
          displayEmpty
          onChange={console.log}
          slotProps={{
            input: {
              sx: {
                padding: "4px 24px",
                fontSize: 21,
                borderRadius: "5px",
                border: "1px solid black",
                fontWeight: 600,
              },
            },
          }}
          IconComponent="span"
        >
          <MenuItem value="" sx={{ display: "none" }}>
            <Placeholder>Select</Placeholder>
          </MenuItem>
          {SORT.map((sort) => (
            <MenuItem
              key={sort}
              value={sort}
              sx={{
                fontWeight: 600,
                fontSize: 21,
                py: 0,
              }}
            >
              {sort}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
