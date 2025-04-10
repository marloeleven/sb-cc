import { getTempData, saveTempData } from "@/lib/temp-data";
import { Recipe } from "@/types";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { copyFile, getFilename } from ".";

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

  if (req.method === "PUT") {
    try {
      const form = formidable({
        keepExtensions: true,
        maxFiles: 1,
      });
      const [fields, files] = await form.parse(req);

      if (!files.image && !fields.image?.[0]) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      if (!fields) {
        return res.status(400).json({ message: "Fields are required" });
      }

      const title = fields.title![0];
      if (
        tempData.find(
          (recipe) => recipe.title === title && recipe.id !== Number(id)
        )
      ) {
        return res.status(400).json({ message: "Recipe already exists" });
      }

      let image = fields.image?.[0];

      const file = files.image?.[0];
      if (file) {
        const filename = getFilename(title, file);
        await copyFile(filename, file);
        image = `/images/${filename}`;
      }

      Object.assign(recipe, {
        title,
        image,
        description: fields.description![0],
        name: fields.name![0],
        email: fields.email![0],
        ingredients: fields.ingredients![0],
        instructions: fields.instructions![0],
        isFavorite: Boolean(fields.isFavorite![0] === "true"),
      });

      await saveTempData(tempData);

      res.status(200).json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }

    return;
  }

  if (req.method === "DELETE") {
    await saveTempData(tempData.filter((recipe) => recipe.id !== Number(id)));

    res.status(200).json({ message: "Recipe deleted successfully" });
    return;
  }

  res.status(200).json(recipe);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
