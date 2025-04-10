import { getTempData } from "@/lib/temp-data";
import { Recipe } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

interface ErrorMessage {
  message: string;
}
type Response = Recipe | ErrorMessage;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const tempData = await getTempData();
  const id = req.query.id;

  const recipe = tempData.find((recipe) => recipe.id === Number(id));

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }

  res.status(200).json(recipe);
}
