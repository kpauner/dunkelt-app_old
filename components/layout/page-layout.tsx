import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Heading from "./heading";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Paragraph } from "../ui/paragraph";

const pageLayoutVariants = cva("mx-auto w-full", {
  variants: {
    variant: {
      default: "w-full flex-1",
      page: "max-w-screen-xl flex flex-1 flex-col gap-4 ",
      post: "max-w-screen-lg flex flex-1 flex-col gap-4 ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const contentVariants = cva("", {
  variants: {
    layout: {
      default: "",
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
      list: "flex flex-col gap-4",
      row: "flex flex-row gap-4",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

type PageLayoutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof pageLayoutVariants> & {
    title?: string;
    menu?: {
      label: string;
      url: string;
      icon: React.ElementType;
      isActive?: boolean;
    }[];
    description?: string;
    contentLayout?: VariantProps<typeof contentVariants>["layout"];
  };

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    {
      className,
      variant,
      title,
      description,
      children,
      menu,
      contentLayout,
      ...props
    },
    ref
  ) => {
    const locale = useLocale();

    return (
      <main
        ref={ref}
        className={cn(pageLayoutVariants({ variant, className }))}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col pb-4">
            {title && (
              <Heading as="h1" size="md" className="pb-0">
                {title}
              </Heading>
            )}
            {description && (
              <p className="text-sm text-muted-foreground pt-2 md:text-xl">
                {description}
              </p>
            )}
          </div>
        )}
        {menu && menu.length > 0 && (
          <nav className="flex gap-2 mb-4 bg-muted rounded-md h-12 p-1 text-sm">
            {menu.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={`/${locale}${item.url}`}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded text-muted-foreground",
                    item.isActive
                      ? "bg-accent-dark text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
        <div className={cn(contentVariants({ layout: contentLayout }))}>
          {children}
        </div>
      </main>
    );
  }
);
PageLayout.displayName = "PageLayout";

const PageSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
  }
>(({ children, className, title, description, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("flex flex-col gap-4 py-4", className)}
      {...props}
    >
      {(title || description) && (
        <header>
          {title && (
            <Heading
              as="h2"
              size="md"
              className="text-accent-foreground text-center font-mono font-extrabold tracking-wide uppercase pb-2"
            >
              {title}
            </Heading>
          )}
          {description && (
            <p className="text-sm text-muted-foreground dark:text-muted-foreground text-center">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
});
PageSection.displayName = "PageSection";

export { PageLayout, PageSection };
