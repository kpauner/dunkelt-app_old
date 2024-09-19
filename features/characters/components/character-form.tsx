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
import { InsertCharacterSchema } from "@/types/characters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = InsertCharacterSchema.pick({
  name: true,
  pronouns: true,
  playbook: true,
});

export type CharacterFormValues = z.infer<typeof formSchema>;

type CharacterFormProps = {
  id?: string;
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
    console.log(values);
  };

  function handleDelete() {
    onDelete?.();
    console.log("delete");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a playbook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
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
        <Button type="submit" disabled={disabled}>
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
