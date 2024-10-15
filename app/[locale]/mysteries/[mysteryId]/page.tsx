import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MysteryDetailsCard from "@/features/mysteries/components/mystery-detail-card";
import { GetMysteryByIdWithParticipants } from "@/features/mysteries/api";
import CharacterCard from "@/features/characters/components/character-card";

type MysteryPageProps = {
  params: {
    mysteryId: string;
    locale: string;
  };
};

export default async function MysteryPage({ params }: MysteryPageProps) {
  const mystery = await GetMysteryByIdWithParticipants(params.mysteryId);
  if (!mystery || !mystery.mysteryParticipants) {
    return <div>Mystery not found</div>;
  }
  return (
    <PageLayout
      title={params.mysteryId}
      description="We suspect a high ranking cult member, behind the disappearance of a local family has escaped to Denmark. We are looking for a hunter familiar with the country to assist in the search."
      contentLayout="list"
      variant="default"
    >
      {/* <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hunsters assigned</h1>
        <Grid>
          <AssignedCharacters mysteryId={params.mysteryId} />
        </Grid>
      </div> */}
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid grid-cols-3 items-start gap-4 lg:col-span-2">
          {mystery.mysteryParticipants.map(
            (participant) =>
              participant && (
                <CharacterCard
                  key={participant.id}
                  name={participant.name}
                  avatar={participant.avatar}
                  look={participant.look ?? ""}
                  playbook={participant.playbook}
                  experience={participant.experience}
                  dateOfBirth={participant.dateOfBirth ?? ""}
                  dateOfDeath={participant.dateOfDeath ?? ""}
                  characterId={participant.id}
                  showDetails={false}
                />
              )
          )}
        </div>
        <MysteryDetailsCard
          id={mystery.id}
          title={mystery.name}
          description={mystery.description}
          year={mystery.year}
          era={mystery.era}
          participants={mystery.mysteryParticipants}
        />
      </main>
    </PageLayout>
  );
}
