import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { getPosts } from "@/features/posts/api";

export function useGetPosts() {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts,
  });
}
