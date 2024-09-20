import React, { useState } from "react";
import { format, parse, setDay } from "date-fns";
import { z } from "zod";
import { InsertCharacterSchema } from "@/types/characters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DateOfBirthField } from "@/features/characters/components/date-of-birth-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icons from "@/components/icons";

export const formSchema = InsertCharacterSchema.pick({
  name: true,
  pronouns: true,
  playbook: true,
  look: true,
  dob: true,
  height: true,
  weight: true,
  hair: true,
  eyes: true,
});

export type CharacterFormValues = z.infer<typeof formSchema>;

type CharacterFormProps = {
  id?: number;
  defaultValues?: CharacterFormValues;
  onSubmit: (values: CharacterFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function CharacterForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: CharacterFormProps) {
  const t = useTranslations("motw");
  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: CharacterFormValues) => {
    onSubmit(values);
    console.log(values);
  };

  function handleDelete() {
    onDelete?.();
    console.log("delete");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Character Name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="pronouns"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Pronouns" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="playbook"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playbook</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a playbook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Playbook</SelectLabel>
                      {t.raw("playbooks").map((playbook: any, index: any) => (
                        <SelectItem key={playbook.id} value={playbook.name}>
                          {playbook.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                This is the playbook that your character will use. read more
                about playbooks{" "}
                <Link
                  className="underline underline-offset-4"
                  prefetch={false}
                  href="/motw/playbooks"
                >
                  here
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="look"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Look</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Look"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Short description of your character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Additional Information</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <DateOfBirthField form={form} disabled={disabled} />
              <FormField
                name="height"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={disabled}
                        placeholder="Height in cm"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="weight"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={disabled}
                        placeholder="Weight in kg"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hair"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hair</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled}
                        placeholder="Blond, short"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="eyes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eye color</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled}
                        placeholder="Green"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex gap-2 items-center pt-2">
          {!id && (
            <Button
              variant="destructive"
              size="icon"
              type="button"
              onClick={handleDelete}
            >
              <Icons.trash className="size-5" />
            </Button>
          )}
          <Button type="submit" disabled={disabled} className="ml-auto">
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
