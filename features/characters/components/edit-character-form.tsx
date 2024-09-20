import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/features/characters/components/create-character-form";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateOfBirthField } from "@/features/characters/components/date-of-birth-field";
import Link from "next/link";
import { useTranslations } from "next-intl";

type FormValues = z.infer<typeof formSchema>;

export function EditCharacterForm() {
  const { character, updateCharacter } = useCharacterStore();
  const t = useTranslations("motw");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: character?.name || "",
      pronouns: character?.pronouns || "",
      playbook: character?.playbook || "",
      look: character?.look || "",
      dob: character?.dob || "",
      height: character?.height || null,
      weight: character?.weight || null,
      hair: character?.hair || "",
      eyes: character?.eyes || "",
    },
  });

  // Update character in store when form values change
  const onFormChange = form.handleSubmit((data) => {
    updateCharacter(data);
  });

  return (
    <Form {...form}>
      <form onChange={onFormChange} className="space-y-5">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Character Name" {...field} />
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
                <Input placeholder="Pronouns" {...field} />
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
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a playbook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Playbook</SelectLabel>
                      {t.raw("playbooks").map((playbook: any) => (
                        <SelectItem key={playbook.id} value={playbook.name}>
                          {playbook.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                This is the playbook that your character will use. Read more
                about playbooks{" "}
                <Link
                  className="underline underline-offset-4"
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
              <DateOfBirthField form={form} />
              <FormField
                name="height"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
      </form>
    </Form>
  );
}
