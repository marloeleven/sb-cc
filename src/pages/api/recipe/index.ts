import { getTempData, saveTempData } from "@/lib/temp-data";
import { Recipe } from "@/types";
import formidable from "formidable";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

interface ErrorMessage {
  message: string;
}
type Response = Recipe[] | Recipe | ErrorMessage;

export const uploadDir = path.join(process.cwd(), "public/images");
export async function copyFile(filename: string, file: formidable.File) {
  const buffer = await fs.readFile(file.filepath);
  const dest = path.join(uploadDir, filename);
  await fs.writeFile(dest, buffer);
}
export function getFilename(filename: string, file: formidable.File) {
  const ext = path.extname(file.originalFilename!);
  return `${filename}${ext}`.toLowerCase();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const tempData = await getTempData();
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
    if (
      tempData.find(
        (recipe) => recipe.title.toLowerCase() === title.toLowerCase()
      )
    ) {
      return res.status(409).json({ message: "Recipe already exists" });
    }

    const filename = getFilename(title, files.image[0]);
    const file = files.image[0];
    await copyFile(filename, file);

    const recipe: Recipe = {
      id: Date.now(),
      title,
      image: `/images/${filename}`,
      description: fields.description![0],
      name: fields.name![0],
      email: fields.email![0],
      ingredients: fields.ingredients![0],
      instructions: fields.instructions![0],
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };

    tempData.push(recipe);

    await saveTempData(tempData);

    res.status(200).json(recipe);

    return;
  }

  return res.status(200).json(tempData);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
