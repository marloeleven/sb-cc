import { Recipe } from "@/types";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data.json");

export async function getTempData(): Promise<Recipe[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading temp data:", error);
    return [];
  }
}

export async function saveTempData(data: Recipe[]) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving temp data:", error);
  }
}
