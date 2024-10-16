import React from "react";
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
import Icons from "@/components/icons";

export const formSchema = InsertCharacterSchema.pick({
  name: true,
  pronouns: true,
  playbook: true,
  look: true,
  dateOfBirth: true,
  dateOfDeath: true,
  userId: true,
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
                      {(
                        t.raw("playbooks") as Array<{
                          id: string;
                          label: string;
                        }>
                      ).map((playbook) => (
                        <SelectItem key={playbook.id} value={playbook.id}>
                          {playbook.label}
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
        <DateOfBirthField form={form} disabled={disabled} />
        <div className="flex gap-2 items-center pt-2">
          {!!id && (
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
