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
import React from "react";

export default function MarketplacePage() {
  return (
    <PageLayout
      title="Something long"
      description="some long description here"
      variant="post"
      className=""
    >
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>jj</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>kk</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <h1>Marketplace</h1>
      <Button variant="default">Previous</Button>
      <Button variant="secondary">Buy</Button>
      <Button variant="outline">Buy</Button>
      <Button variant="ghost">Buy</Button>
      <Button variant="destructive">Buy</Button>

      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <Button>Buy</Button>
        </CardFooter>
      </Card>

      <Avatar src={null || AVATARS.DEFAULT} alt="User Name" />

      <Avatar size="sm" variant="circle">
        +3
      </Avatar>

      <Avatar fallback={<Icons.user />} />

      <Avatar />
    </PageLayout>
  );
}
