import { useAppDispatch } from "@/store";
import { recipeActions, recipeSelectors } from "@/store/recipe";
import { FilterFavorites } from "@/types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

export function Filter({ children }: PropsWithChildren) {
  const favorites = useSelector(recipeSelectors.getFilterFavorites);
  const dispatch = useAppDispatch();

  const onChange =
    (value: Exclude<FilterFavorites, "ALL">) =>
    (_event: React.SyntheticEvent, checked: boolean) => {
      dispatch(
        recipeActions.setFilterFavorites({
          type: value,
          checked,
        })
      );
    };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {children}
      <Paper
        sx={{
          py: 1,
          px: "23px",
          color: "#616161",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            padding: "15px 0",
          }}
        >
          Favorites?
        </Typography>
        <FormGroup sx={{ pl: 3 }}>
          <FormControlLabel
            control={<Checkbox name="yes" />}
            label="Yes"
            onChange={onChange("YES")}
            checked={favorites.YES}
          />
          <FormControlLabel
            control={<Checkbox name="no" />}
            label="No"
            onChange={onChange("NO")}
            checked={favorites.NO}
          />
        </FormGroup>
      </Paper>
    </Box>
  );
}
