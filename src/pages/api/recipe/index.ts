import { testRecipes } from "@/data/data";
import { Recipe } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

interface ErrorMessage {
  message: string;
}
type Response = Recipe[] | ErrorMessage;
export default function GET(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  res.status(200).json(testRecipes);
}
