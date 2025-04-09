import { testRecipes } from "@/data/data";
import { Recipe } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

interface ErrorMessage {
  message: string;
}
type Response = Recipe | ErrorMessage;
export default function GET(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const id = req.query.id;

  const recipe = testRecipes.find((recipe) => recipe.id === Number(id));

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }

  res.status(200).json(recipe);
}
