import Heading from "@/components/layout/heading";
import { PageLayout } from "@/components/layout/page-layout";
import TagCloud from "@/components/tag-cloud";
import { getPostById } from "@/features/posts/api";
import { formatDate } from "@/lib/utils/time";
import { Author, Post } from "@/types/posts";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";
export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post: Post = await getPostById(params.postId);
  const t = await getTranslations("tags");

  return (
    <PageLayout variant="post">
      <header className="flex flex-col overflow-hidden">
        <div className="relative h-[400px] mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className=" rounded-lg border-4 border-border object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <PostMeta author={post.author} created={post.created} />
          <Heading
            as="h1"
            size="lg"
            className="my-2 capitalize text-center font-extrabold"
          >
            {post.title}
          </Heading>
          <TagCloud data={post.categories} />
        </div>
      </header>
      <article className="mt-8 prose prose-lg mx-auto text-foreground">
        {ReactHtmlParser(post.content)}
      </article>
    </PageLayout>
  );
}

function PostMeta({ author, created }: { author: Author; created: string }) {
  return (
    <>
      <span className="text-sm text-muted-foreground flex flex-row items-center">
        {formatDate(created)}
        <span className="mx-2">•</span>
        <span className="relative max-w-xs mx-auto flex flex-row items-center">
          {author.username}
        </span>
      </span>
    </>
  );
}
