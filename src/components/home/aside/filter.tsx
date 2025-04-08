import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";

export function Filter({ children }: PropsWithChildren) {
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
          <FormControlLabel control={<Checkbox name="yes" />} label="Yes" />
          <FormControlLabel control={<Checkbox name="no" />} label="No" />
        </FormGroup>
      </Paper>
    </Box>
  );
}
