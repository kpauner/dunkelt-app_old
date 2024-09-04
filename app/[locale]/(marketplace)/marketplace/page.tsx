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
import React from "react";

export default function MarketplacePage() {
  return (
    <div className="flex flex-col gap-12 max-w-lg mx-auto">
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
    </div>
  );
}
