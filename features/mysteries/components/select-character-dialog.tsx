"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { CommandGroup } from "@/components/ui/command";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { useAddCharacterDialog } from "@/features/characters/hooks/use-add-character-dialog";
import { Avatar } from "@/components/ui/avatar";
import { AVATARS } from "@/constants/constants";
import { useGetCharacters } from "@/features/characters/queries/use-get-characters";
import { Check } from "lucide-react";
import Icons from "@/components/icons";
import { toast } from "sonner";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type SelectCharacterDialogProps = PopoverTriggerProps & {
  mysteryId: string;
  userId: string | null;
  currentCharacterId: number | null;
};

export default function SelectCharacterDialog({
  className,
  mysteryId,
  userId,
  currentCharacterId,
}: SelectCharacterDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { onOpen } = useAddCharacterDialog();
  const { data: characters } = useGetCharacters();

  const currentCharacter = characters?.find((c) => c.id === currentCharacterId);

  const handleCharacterSelect = (characterId: number) => {
    // updateMysteryParticipant.mutate(
    //   { mysteryId, userId, characterId },
    //   {
    //     onSuccess: () => {
    //       setOpen(false);
    //     },
    //   }
    // );
    toast.success("Updating characters has been disabled");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar
            variant="circle"
            className="mr-2 size-6 grayscale"
            src={currentCharacter?.avatar || AVATARS.BESTIARY}
          />
          {currentCharacter?.name || "Select a character..."}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 ">
        <Command>
          <CommandInput placeholder="Search characters..." />
          <CommandList>
            <CommandEmpty>No characters found.</CommandEmpty>

            <CommandGroup>
              {characters?.map((character) => (
                <CommandItem
                  key={character.id}
                  value={character.name}
                  onSelect={() => handleCharacterSelect(character.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Avatar
                      variant="circle"
                      className="mr-2 size-6 grayscale"
                      src={character.avatar || AVATARS.BESTIARY}
                    />
                    {character.name}
                  </div>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentCharacterId === character.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <Icons.add className="mr-2 h-5 w-5" />
                Create New Character
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
