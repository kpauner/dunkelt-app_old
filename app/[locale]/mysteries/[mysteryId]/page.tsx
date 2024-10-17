import React, { Fragment } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import {
  Card,
  CardContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MysteryDetailsCard from "@/features/mysteries/components/mystery-detail-card";
import { GetMysteryByIdWithParticipants } from "@/features/mysteries/api";
import CharacterCard from "@/features/characters/components/character-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SelectCharacterDialog from "@/features/mysteries/components/select-character-dialog";
import { auth } from "@/lib/auth";
import { isValidSession } from "@/lib/session";
import { redirect } from "next/navigation";

type MysteryPageProps = {
  params: {
    mysteryId: string;
    locale: string;
  };
};

export default async function MysteryPage({ params }: MysteryPageProps) {
  const mystery = await GetMysteryByIdWithParticipants(params.mysteryId);
  const session = await auth();
  if (!mystery || !mystery.mysteryParticipants) {
    return <div>Mystery not found</div>;
  }

  // if (!isValidSession(session)) {
  //   redirect("/sign-in");
  // }

  // const currentUserParticipant = mystery.mysteryParticipants.find(
  //   (participant) =>
  //     participant.invitedEmail === session.user.email ||
  //     participant.userId === session.user.id
  // );

  // if (!currentUserParticipant) {
  //   return <div>You are not a participant in this mystery</div>;
  // }

  // Add this console log to check the mystery data
  console.log("Mystery data:", JSON.stringify(mystery, null, 2));

  return (
    <PageLayout contentLayout="list" variant="default">
      <Alert variant="warning">
        <AlertTitle>DEMO CONTENT</AlertTitle>
        <AlertDescription>
          This is demo content. Mysteries will eventually be moved to the user
          menu
        </AlertDescription>
      </Alert>
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <pre>{JSON.stringify(mystery, null, 2)}</pre>
        <div className="grid grid-cols-3 items-start gap-4 lg:col-span-2">
          {mystery.mysteryParticipants.map((participant) => (
            <div key={participant.id} className="flex flex-col gap-4">
              <SelectCharacterDialog
                mysteryId={mystery.id}
                userId={participant.userId || null}
                currentCharacterId={participant.id || null}
                className="w-full"
              />
              <ParticipantCard key={participant.id} participant={participant} />
            </div>
          ))}
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

function ParticipantCard({ participant }: any) {
  const hasCharacter = !!participant.name;

  if (hasCharacter) {
    return (
      <CharacterCard
        key={participant.id}
        name={participant.name!}
        avatar={participant.avatar ?? ""}
        look={participant.look ?? ""}
        playbook={participant.playbook ?? ""}
        experience={participant.experience ?? 0}
        dateOfBirth={participant.dateOfBirth ?? ""}
        dateOfDeath={participant.dateOfDeath ?? ""}
        characterId={participant.id.toString()}
        showDetails={false}
      />
    );
  } else {
    return (
      <Card className="flex flex-col gap-2 justify-center items-center text-center py-4 px-6">
        <p>
          player <span className="font-bold">{participant.userName}</span> has
          not selected a character yet
        </p>
      </Card>
    );
  }
}
