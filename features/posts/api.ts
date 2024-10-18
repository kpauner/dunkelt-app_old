import { IMAGES } from "@/constants/constants";
import { env } from "@/lib/env";
import { getImageUrl } from "@/lib/utils/url-helpers";
import { PostsResponse } from "@/types/posts";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_POCKETBASE_URL,
});

export async function getPosts(): Promise<PostsResponse> {
  try {
    const response = await axiosInstance.get("/api/collections/posts/records", {
      params: {
        expand: "categories",
        filter: "isPublished=true",
        sort: "-created",
      },
    });

    const items = response.data.items.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image:
        getImageUrl(post.collectionId, post.id, post.image) || IMAGES.NOT_FOUND,
      created: post.created,
      updated: post.updated,
      year: post.year,
      isPublished: post.isPublished,
      categories:
        post.expand?.categories?.map((category: any) => category.title) || [],
    }));

    return {
      items,
      pagination: {
        page: response.data.page,
        perPage: response.data.perPage,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to fetch posts", { cause: error });
  }
}
