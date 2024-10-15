"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Grid from "@/components/layout/grid";
import { Avatar } from "@/components/ui/avatar";
import { AVATARS } from "@/constants/constants";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import Icons from "@/components/icons";
import { useGetMysteryByIdWithParticipants } from "../queries/use-get-mystery-by-id-with-participants";
import { DescriptionListItem } from "@/components/layout/description-list";
import { DescriptionList } from "@/components/layout/description-list";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useLocale } from "next-intl";

type MysteryDetailsCardProps = {
  id: string;
  title: string;
  year: number | null;
  era: string;
  description: string[];
  participants: any[];
};
export default function MysteryDetailsCard({
  id,
  title,
  year,
  era,
  description,
  participants,
}: MysteryDetailsCardProps) {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-black/40">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {title}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Invite players</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Year: {year} {era}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <InviteDialog triggerTitle="Invite players" mysteryId={id} />
          <MysteryDetailsCardMenu />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Brief</div>
          <div className="grid gap-3">
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="flex items-center justify-between text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Separator className="my-2" />
          <DescriptionList>
            <DescriptionListItem term="Case number" description={id} />
            <DescriptionListItem
              term="Locations"
              description="Denmark, Sweden"
            />
            <DescriptionListItem term="Local contact" description="None" />
          </DescriptionList>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Players</div>
          <DescriptionList>
            {participants.map((participant) => (
              <DescriptionListItem
                key={participant.id}
                term="Hunter"
                description={participant.name}
              />
            ))}
          </DescriptionList>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t border-border py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
}

function MysteryDetailsCardMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <MoreVertical className="h-3.5 w-3.5" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Export</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Trash</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InviteDialog({
  triggerTitle,
  mysteryId,
}: {
  triggerTitle: string;
  mysteryId: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const locale = useLocale();
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/mysteries/join/${mysteryId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      toast("The invite link has been copied to your clipboard.");
      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast("Failed to copy the invite link. Please try again.");
    }
  };

  const handleResetLink = () => {
    toast("Reset link has been disabled");
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-2">
          <Icons.invite className="h-3.5 w-3.5 " />
          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            {triggerTitle}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
          <DialogDescription>
            Send this invite link to your players, to have them join your
            mystery.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            value={inviteLink}
            readOnly
            className="border-dashed"
          />
          <Button
            variant="secondary"
            className="w-24 shrink-0"
            onClick={handleCopyLink}
          >
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        <Separator className="my-4" />
        <div>
          <Input
            id="link"
            value={inviteLink}
            readOnly
            className="border-dashed"
          />
        </div>
        <DialogFooter className="flex sm:justify-between w-full pt-4 ">
          <Button
            variant="link"
            className="dark:text-warning hover:text-destructive-foreground/80 border border-warning "
            onClick={handleResetLink}
          >
            Reset link
          </Button>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
