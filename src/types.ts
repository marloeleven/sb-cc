export interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  author: string;
  isFavorite: boolean;
}

export type SortType = "ASC" | "DESC";
export type FilterFavorites = "ALL" | "NO" | "YES";
