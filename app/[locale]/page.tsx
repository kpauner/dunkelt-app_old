import Heading from "@/components/layout/heading";
import { auth } from "@/lib/auth";
import { Paragraph } from "@/components/ui/paragraph";
import { PageLayout, PageSection } from "@/components/layout/page-layout";
import Hero from "@/components/marketing/hero";
import { getLocale, getTranslations } from "next-intl/server";
import { Category } from "@/types";
import CategoryCard from "@/components/category-card";
import Icons from "@/components/icons";
import { IMAGES } from "@/constants/constants";
import PostCard from "@/features/posts/components/post-card";
import { getPosts } from "@/features/posts/api";

export default async function HomePage() {
  const t = await getTranslations("codex");
  const session = await auth();
  const locale = await getLocale();
  const posts = await getPosts();
  const categories: Category[] = t.raw("categories") as Category[];
  return (
    <PageLayout className="flex-1 flex flex-col gap-8" variant="page">
      <Hero />

      <section className="py-8">
        <Heading as="h2" size="md" className="text-accent-foreground">
          Welcome back {session?.user?.name}
        </Heading>

        <Paragraph size="lg">
          You&apos;ve been gone for a while. Let&apos;s get you back on track.
        </Paragraph>
      </section>
      <PageSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent =
              Icons[category.key as keyof typeof Icons] || Icons.help;
            return (
              <CategoryCard
                icon={IconComponent}
                href={`/${locale}/${category.href}`}
                key={category.key}
                title={category.label}
                description={category.description}
                image={IMAGES[category.image]}
                className="h-[200px]"
              />
            );
          })}
        </div>
      </PageSection>
      <PageSection
        title="Untold Stories"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.items.slice(0, 4).map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              image={post.imageUrl}
              url={`/${locale}/posts/${post.id}`}
              year={post.year}
              updatedAt={post.updated}
              excerpt={post.excerpt}
              author={post.author}
              categories={post.categories}
            />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
