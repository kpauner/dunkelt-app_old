import React, { useCallback, useEffect, useRef, useState } from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Alert } from "@/components/ui/alert";
import Icons from "@/components/icons";
import { ReactTags, Tag, TagSuggestion } from "react-tag-autocomplete";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TheChosenPlaybook } from "@/types/playbooks";
import { MultiSelect } from "@/components/multi-select";
import MultiTagSelect from "@/components/multi-tag-select";

const FormSchema = z.object({
  howYouFoundOut: z.string(),
  heroic: z.array(z.string()).length(2),
  doom: z.array(z.string()).length(2),
});

type FormValues = z.infer<typeof FormSchema>;

export default function YourFate() {
  const { character, updateCharacter } = useCharacterStore((state) => ({
    character: state.character,
    updateCharacter: state.updateCharacter,
  }));
  const [selected, setSelected] = useState([]);
  const locale = useLocale();
  const t = useTranslations("playbooks");

  const chosenPlaybook = character?.characterPlaybooks.find(
    (playbook): playbook is TheChosenPlaybook => playbook.name === "The Chosen"
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      howYouFoundOut: chosenPlaybook?.customFields.howYouFoundOut || "",
      heroic: chosenPlaybook?.customFields.heroic || [],
      doom: chosenPlaybook?.customFields.doom || [],
    },
  });

  const formValues = form.watch();
  const prevFormValuesRef = useRef(formValues);

  useEffect(() => {
    if (!chosenPlaybook || !character) return;

    const hasChanged = (prev: FormValues, current: FormValues) =>
      prev.howYouFoundOut !== current.howYouFoundOut ||
      prev.heroic.join(",") !== current.heroic.join(",") ||
      prev.doom.join(",") !== current.doom.join(",");

    if (hasChanged(prevFormValuesRef.current, formValues)) {
      updateCharacter({
        ...character,
        characterPlaybooks: character.characterPlaybooks.map((playbook) =>
          playbook.name === "The Chosen"
            ? {
                ...playbook,
                customFields: {
                  howYouFoundOut: formValues.howYouFoundOut,
                  heroic: formValues.heroic,
                  doom: formValues.doom,
                },
              }
            : playbook
        ),
      });

      prevFormValuesRef.current = formValues;
    }
  }, [formValues, chosenPlaybook, updateCharacter, character]);

  return (
    <CharacterSheetBlock
      label={t("thechosen.your_fate.label")}
      description={t("thechosen.your_fate.description")}
      tooltip={t("thechosen.your_fate.tooltip")}
      notice={t("thechosen.your_fate.notice")}
      footer={
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon">
              <Icons.settings />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Fate</SheetTitle>
            </SheetHeader>

            <Form {...form}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="howYouFoundOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How you found out</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select how you found out" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {t
                            .raw("thechosen.your_fate.how_you_found_out")
                            .map((option: string) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heroic Deeds</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={t
                            .raw("thechosen.your_fate.heroic")
                            .map((option: string) => ({
                              label: option,
                              value: option,
                            }))}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          placeholder="Select heroic deeds"
                          animation={2}
                          maxCount={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doom Tags</FormLabel>
                      <FormControl>
                        <MultiTagSelect
                          onChange={field.onChange}
                          value={field.value}
                          maxLength={2}
                          suggestions={t
                            .raw("thechosen.your_fate.doom")
                            .map((option: string) => ({
                              label: option,
                              value: option,
                            }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </SheetContent>
        </Sheet>
      }
    >
      <Alert variant="warning">no fate selected</Alert>
      {JSON.stringify(formValues)}
    </CharacterSheetBlock>
  );
}
