import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Alert } from "@/components/ui/alert";
import Icons from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TheChosenPlaybook } from "@/types/playbooks";
import MultiTagSelect from "@/components/multi-tag-select";
import Heading from "@/components/layout/heading";
import TagCloud from "@/components/tag-cloud";

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
  const tCommon = useTranslations("common");

  const chosenPlaybook = character?.characterPlaybooks.find(
    (playbook): playbook is TheChosenPlaybook => playbook.name === "thechosen"
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

  const isFateMissing = useCallback(() => {
    return (
      !formValues.howYouFoundOut ||
      formValues.heroic.length < 2 ||
      formValues.doom.length < 2
    );
  }, [formValues]);

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

  const getMissingFateNotice = useCallback(() => {
    if (!isFateMissing()) return undefined;

    const missingItems = [];
    if (!formValues.howYouFoundOut)
      missingItems.push(t("thechosen.your_fate.how_you_found_out.label"));
    if (formValues.heroic.length < 2)
      missingItems.push(t("thechosen.your_fate.heroic.label"));
    if (formValues.doom.length < 2)
      missingItems.push(t("thechosen.your_fate.doom.label"));

    return t("thechosen.your_fate.incomplete_notice", {
      missingItems: missingItems.join(", "),
    });
  }, [formValues, isFateMissing, t]);

  return (
    <CharacterSheetBlock
      label={t("thechosen.your_fate.label")}
      description={t("thechosen.your_fate.description")}
      tooltip={t("thechosen.your_fate.tooltip")}
      notice={isFateMissing() ? getMissingFateNotice() : undefined}
      footer={
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon">
              <Icons.settings />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t("thechosen.your_fate.label")}</SheetTitle>
              <SheetDescription>
                {t("thechosen.your_fate.tooltip")}
              </SheetDescription>
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
                            <SelectValue
                              placeholder={t(
                                "thechosen.your_fate.how_you_found_out.label"
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {t
                            .raw(
                              "thechosen.your_fate.how_you_found_out.options"
                            )
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
                      <FormLabel>
                        {t("thechosen.your_fate.heroic.label")}
                      </FormLabel>
                      <FormControl>
                        <MultiTagSelect
                          onChange={field.onChange}
                          value={field.value}
                          maxLength={2}
                          suggestions={t
                            .raw("thechosen.your_fate.heroic.options")
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
                            .raw("thechosen.your_fate.doom.options")
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
      <div className="space-y-4 pt-4">
        {formValues.howYouFoundOut && (
          <RenderFate
            tags={[formValues.howYouFoundOut]}
            noneSelected={tCommon("none_selected")}
            title={t("thechosen.your_fate.how_you_found_out.label")}
          />
        )}
        {formValues.heroic.length > 0 && (
          <RenderFate
            tags={formValues.heroic}
            noneSelected={tCommon("none_selected")}
            title={t("thechosen.your_fate.heroic.label")}
          />
        )}
        {formValues.doom.length > 0 && (
          <RenderFate
            tags={formValues.doom}
            noneSelected={tCommon("none_selected")}
            title={t("thechosen.your_fate.doom.label")}
          />
        )}
      </div>
    </CharacterSheetBlock>
  );
}

function RenderFate({
  tags,
  noneSelected,
  title,
}: {
  tags: string[];
  noneSelected: string;
  title: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <Heading as="h3" size="xs" className="uppercase tracking-wide">
          {title}
        </Heading>
        {tags.length > 0 ? (
          <TagCloud data={tags} />
        ) : (
          <Alert variant="warning">{noneSelected}</Alert>
        )}
      </div>
    </>
  );
}
