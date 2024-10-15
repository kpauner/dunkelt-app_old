"use client";

import React from "react";
import { cn, truncateText } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const pathname = usePathname() || "";
  const locale = useLocale();
  const paths = pathname.split("/").filter((path) => path !== "");
  const maxLength = 12;
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.map((path, i) => {
          const isLast = i === paths.length - 1;
          const displayedPath = truncateText(path, maxLength);

          return (
            <React.Fragment key={path}>
              {isLast ? (
                <BreadcrumbPage>{displayedPath}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbItem className="text-accent">
                    <BreadcrumbLink asChild>
                      <Link
                        href={`/${locale}/${path}`}
                        className={cn(
                          "text-primary-foreground/30",
                          isLast && "text-primary-foreground"
                        )}
                      >
                        {displayedPath}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
