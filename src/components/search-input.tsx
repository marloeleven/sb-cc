import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export function SearchInput() {
  return (
    <TextField
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
