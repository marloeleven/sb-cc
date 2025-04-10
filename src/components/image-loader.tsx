import { Skeleton } from "@mui/material";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import { FlexBox } from "./flexbox";

type ImageLoaderProps = ComponentProps<typeof Image>;

export function ImageLoader({ alt, ...props }: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <FlexBox
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        {...props}
        priority={props.priority ?? false}
        alt={alt ?? "Recipe Image"}
        onLoad={(event) => {
          setIsLoading(false);
          props.onLoad?.(event);
        }}
      />

      {isLoading && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 5,
          }}
        />
      )}
    </FlexBox>
  );
}
