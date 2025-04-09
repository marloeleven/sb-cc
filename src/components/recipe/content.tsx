import { recipeActions } from "@/store/recipe";
import type { Recipe } from "@/types";
import { Button, InputBase, InputBaseProps, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FlexBox } from "../flexbox";

interface TextInputProps extends InputBaseProps {
  label: string;
}
function TextInput({
  name,
  label,
  value,
  placeholder = "Text field data",
  readOnly = false,
  sx,
  ...props
}: TextInputProps) {
  return (
    <FlexBox col sx={{ gap: 1 }}>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontSize: 20,
          color: "#000000",
        }}
      >
        {label}
      </Typography>
      <InputBase
        fullWidth
        type="text"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        inputProps={{
          style: {
            width: "100%",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            border: "1px solid #000000",
            padding: "10px",
            maxWidth: "600px",
            maxHeight: "300px",
          },
        }}
        {...props}
        sx={{
          ...sx,
        }}
      />
    </FlexBox>
  );
}

export function Content({ recipe }: { recipe?: Recipe } = {}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onDelete = () => {
    dispatch(recipeActions.removeRecipe(recipe!.id));
    router.push("/");
  };
  return (
    <FlexBox
      col
      sx={{
        flexGrow: 1,
        gap: 2,
      }}
    >
      <TextInput name="name" label="Name" value={recipe?.name} />

      <TextInput name="email" label="Email Address" value={recipe?.email} />

      <TextInput
        name="title"
        label="Title"
        value={recipe?.title}
        readOnly={!!recipe?.title}
      />

      <TextInput
        name="description"
        label="Description"
        value={recipe?.description}
        placeholder="Description here"
        multiline
        rows={4}
        slotProps={{
          input: {
            sx: {
              resize: "both",
            },
          },
        }}
      />

      <TextInput
        name="ingredients"
        label="Ingredients"
        value={recipe?.ingredients}
        placeholder="Description here"
        multiline
        rows={4}
        slotProps={{
          input: {
            sx: {
              resize: "both",
            },
          },
        }}
      />

      <TextInput
        name="instructions"
        label="Instructions"
        value={recipe?.instructions}
        placeholder="Description here"
        multiline
        rows={4}
        slotProps={{
          input: {
            sx: {
              resize: "both",
            },
          },
        }}
      />

      <FlexBox
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        {!!recipe?.id && (
          <Button
            onClick={onDelete}
            variant="contained"
            color="warning"
            size="small"
            type="button"
            sx={{
              px: 5,
            }}
          >
            Delete
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          sx={{
            px: 5,
          }}
        >
          Save
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
