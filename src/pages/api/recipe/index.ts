import { testRecipes } from "@/data/data";
import { Recipe } from "@/types";
import formidable from "formidable";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

interface ErrorMessage {
  message: string;
}
type Response = Recipe[] | Recipe | ErrorMessage;

export const TempData = testRecipes;

const uploadDir = path.join(process.cwd(), "public/images");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const form = formidable({
      keepExtensions: true,
      maxFiles: 1,
    });
    const [fields, files] = await form.parse(req);

    if (!files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    if (!fields) {
      return res.status(400).json({ message: "Fields are required" });
    }

    const title = fields.title![0];
    if (TempData.find((recipe) => recipe.title === title)) {
      return res.status(400).json({ message: "Recipe already exists" });
    }

    const file = files.image[0];
    const buffer = await fs.readFile(file.filepath);

    const recipe: Recipe = {
      id: Date.now(),
      title,
      image: `/images/${file.originalFilename}`,
      description: fields.description![0],
      name: fields.name![0],
      email: fields.email![0],
      ingredients: fields.ingredients![0],
      instructions: fields.instructions![0],
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };

    TempData.push(recipe);

    const dest = path.join(uploadDir, file.originalFilename!);
    await fs.writeFile(dest, buffer);

    res.status(200).json(recipe);

    return;
  }

  return res.status(200).json(TempData);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
