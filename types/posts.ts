export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  created: string;
  updated: string;
  year: string;
  isPublished: boolean;
  categories: string[];
};

type PaginationInfo = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export type PostsResponse = {
  items: Post[];
  pagination: PaginationInfo;
};
