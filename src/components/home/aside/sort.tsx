import { useAppDispatch } from "@/store";
import { recipeActions, recipeSelectors } from "@/store/recipe";
import { SortType } from "@/types";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { Box, FormControl, MenuItem, styled } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

const Placeholder = styled("span")({
  color: "#616161",
  fontSize: 21,
});

const SORT: SortType[] = ["ASC", "DESC"];

export default function Sort({ children }: PropsWithChildren) {
  const sort = useSelector(recipeSelectors.getFilterSort);
  const dispatch = useAppDispatch();

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
          value={sort}
          displayEmpty
          onChange={(event: SelectChangeEvent) => {
            dispatch(recipeActions.setSort(event.target.value as SortType));
          }}
          slotProps={{
            root: {
              sx: {
                borderRadius: 5,
                border: "1px solid black",
              },
            },
            input: {
              sx: {
                padding: "4px 24px",
                fontSize: 21,
                fontWeight: 600,
                backgroundColor: "#ffffff",
              },
            },
          }}
          IconComponent={ExpandMoreOutlined}
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
