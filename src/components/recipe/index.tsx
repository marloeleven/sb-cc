import type { Recipe } from "@/types";
import { ContentLayout } from "../content-layout";
import { FlexBox } from "../flexbox";
import { Aside } from "./aside";

export function Recipe({ recipe }: { recipe?: Recipe } = {}) {
  return (
    <ContentLayout
      aside={<Aside />}
      content={
        <FlexBox
          column
          sx={{
            gap: 3,
            overflowY: "auto",
            maxHeight: "70vh",
            px: 1,
          }}
        >
          {recipe?.title}
        </FlexBox>
      }
    />
  );
}

Recipe.withLayout = true;
