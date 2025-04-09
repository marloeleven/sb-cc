export interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  name: string;
  email: string;
  ingredients: string;
  instructions: string;
  isFavorite: boolean;
}

export type SortType = "ASC" | "DESC";
export type FilterFavorites = "ALL" | "NO" | "YES";
