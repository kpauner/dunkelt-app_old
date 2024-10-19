import Icons from "@/components/icons";
import LoadingLogo from "@/components/layout/loading-logo";
import { PageLayout } from "@/components/layout/page-layout";
import Loader from "@/components/loader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AVATARS } from "@/constants/constants";
import MarketplaceCarousel from "@/features/marketplace/components/marketplace-carousel";
import MarketplaceHeader from "@/features/marketplace/components/marketplace-header";
import React from "react";

export default function MarketplacePage() {
  return (
    <PageLayout variant="page">
      <div className="flex flex-col gap-12">
        <MarketplaceHeader />
        <section>
          <MarketplaceCarousel />
        </section>
      </div>
    </PageLayout>
  );
}
