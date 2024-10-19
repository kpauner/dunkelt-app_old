export type Author = {
  id: string;
  username: string;
  avatarUrl: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  created: string;
  updated: string;
  year: string;
  isPublished: boolean;
  categories: string[];
  author: Author;
};

export type PostsResponse = {
  items: Post[];
  pagination: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
};
