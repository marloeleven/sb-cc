export interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  name: string;
  email: string;
  ingredients: string;
  instructions: string;
  isFavorite: boolean;
  createdAt: string;
}

export type SortType = "ASC" | "DESC";
export type FilterFavorites = "ALL" | "NO" | "YES";
