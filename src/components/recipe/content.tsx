import { useAppDispatch } from "@/store";
import { recipeSelectors } from "@/store/recipe";
import { deleteRecipe, RecipeFormData } from "@/store/recipe-actions";
import type { Recipe } from "@/types";
import { Button, InputBase, InputBaseProps, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { FlexBox } from "../flexbox";

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
interface TextInputProps extends InputBaseProps {
  label: string;
  errorMessage?: string;
}
const TextInput = forwardRef(function TextInputBase(
  {
    name,
    label,
    value,
    placeholder = "Text field data",
    readOnly = false,
    errorMessage,
    ...props
  }: TextInputProps,
  ref
) {
  return (
    <FlexBox col sx={{ gap: 0 }}>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontSize: 20,
          color: "#000000",
          pb: 1,
        }}
      >
        {label}
      </Typography>
      <InputBase
        ref={ref}
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
            maxWidth: "750px",
            maxHeight: "300px",
          },
        }}
        {...props}
      />

      <Typography
        variant="body2"
        color="error"
        sx={{
          fontSize: 14,
          visibility: !!errorMessage ? "visible" : "hidden",
          whiteSpace: "pre-wrap",
        }}
      >
        {capitalize(errorMessage || " ")}
      </Typography>
    </FlexBox>
  );
});

interface ContentProps {
  recipe?: Recipe;
  errors: FieldErrors<RecipeFormData>;
  control: Control<RecipeFormData, any, FieldValues>;
}

export function Content({ recipe, errors, control }: ContentProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = useSelector(recipeSelectors.isLoading);

  const onDelete = () => {
    dispatch(deleteRecipe(recipe!.id));
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
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            {...field}
            errorMessage={errors[field.name]?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Email Address"
            {...field}
            errorMessage={errors[field.name]?.message}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Title"
            readOnly={!!recipe?.id}
            {...field}
            errorMessage={errors[field.name]?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Description"
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
            {...field}
            errorMessage={errors[field.name]?.message}
          />
        )}
      />

      <Controller
        name="ingredients"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Ingredients"
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
            {...field}
            errorMessage={errors[field.name]?.message}
          />
        )}
      />

      <Controller
        name="instructions"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Instructions"
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
            {...field}
            errorMessage={errors[field.name]?.message}
          />
        )}
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
          disabled={!!Object.values(errors).length || isLoading}
          sx={{
            px: 5,
          }}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
