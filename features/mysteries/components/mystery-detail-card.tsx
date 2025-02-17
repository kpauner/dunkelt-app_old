"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, MoreVertical } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { DescriptionListItem } from "@/components/layout/description-list";
import { DescriptionList } from "@/components/layout/description-list";
import InvitePlayerDialog from "./invite-player-dialog";

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
          <InvitePlayerDialog triggerTitle="Invite players" mysteryId={id} />
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
          {participants.length > 0 ? (
            <DescriptionList>
              {participants.map((participant) => (
                <DescriptionListItem
                  key={participant.id}
                  term={participant.userName}
                  description={participant.name || "not assigned"}
                />
              ))}
            </DescriptionList>
          ) : (
            <p className="text-sm text-muted-foreground">
              No players yet. Invite players to join this mystery.
            </p>
          )}
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
