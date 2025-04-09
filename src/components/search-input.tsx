import { recipeActions } from "@/store/recipe";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function SearchInput() {
  const dispatch = useDispatch();

  const onChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(recipeActions.setSearch(event.target.value));
    }, 250),
    [dispatch]
  );

  return (
    <TextField
      onChange={onChange}
      slotProps={{
        root: {
          sx: {
            maxWidth: 506,
            width: "100%",
            boxShadow: 5,
            mr: 2,
            border: "1px solid #000000",
            backgroundColor: "#D9D9D9",
            borderRadius: 2,
          },
        },
        htmlInput: {
          sx: {
            padding: "0 24px",
            fontSize: 21,
            borderRadius: 0,
          },
        },
        input: {
          placeholder: "Search here...",
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
