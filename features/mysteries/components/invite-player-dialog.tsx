"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Icons from "@/components/icons";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useLocale } from "next-intl";
import { FormField } from "@/components/ui/form";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMysteryByIdWithParticipants } from "../queries/use-get-mystery-by-id-with-participants";

const profileFormSchema = z.object({
  emails: z.array(
    z.object({
      value: z.string().email(),
    })
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   emails: [
//     { value: "https://shadcn.com" },
//     { value: "http://twitter.com/shadcn" },
//   ],
// };

export default function InvitePlayerDialog({
  triggerTitle,
  mysteryId,
}: {
  triggerTitle: string;
  mysteryId: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const locale = useLocale();
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/mysteries/join/${mysteryId}`;
  const { data: mystery } = useGetMysteryByIdWithParticipants(mysteryId);

  const defaultValues: Partial<ProfileFormValues> = {
    emails: mystery?.mysteryParticipants
      ? mystery.mysteryParticipants
          .filter((participant) => participant.invitedEmail)
          .map((participant) => ({ value: participant.invitedEmail as string }))
      : [],
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { emails: [] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "emails",
    control: form.control,
  });

  React.useEffect(() => {
    if (mystery?.mysteryParticipants) {
      const emailValues = mystery.mysteryParticipants
        .filter((participant) => participant.invitedEmail)
        .map((participant) => ({ value: participant.invitedEmail as string }));

      form.reset({ emails: emailValues });
    }
  }, [mystery, form]);

  function onSubmit(data: ProfileFormValues) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      toast("The invite link has been copied to your clipboard.");
      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast("Failed to copy the invite link. Please try again.");
    }
  };

  const handleResetLink = () => {
    toast("Reset link has been disabled");
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-2">
          <Icons.invite className="h-3.5 w-3.5 " />
          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            {triggerTitle}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        {/* <pre>{JSON.stringify(mystery, null, 2)}</pre> */}
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
          <DialogDescription>
            Send this link to your players, to have them join your mystery and
            remember to add their email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            value={inviteLink}
            readOnly
            className="border-dashed"
          />
          <Button
            variant="secondary"
            className="w-24 shrink-0"
            onClick={handleCopyLink}
          >
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
        <Separator className="my-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`emails.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Emails
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Make sure your players have an account.
                      </FormDescription>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                          className="shrink-0"
                        >
                          <Icons.trash className="h-4 w-4" />
                          <span className="sr-only">Delete email</span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                Add Email
              </Button>
            </div>
            <DialogFooter className="flex sm:justify-between w-full pt-4 ">
              <Button
                variant="link"
                type="button"
                className="dark:text-warning hover:text-destructive-foreground/80 border border-warning "
                onClick={handleResetLink}
              >
                Reset link
              </Button>
              <div className="flex gap-2">
                <DialogClose>
                  <Button variant="outline" type="button">
                    Close
                  </Button>
                </DialogClose>
                <Button variant="default" type="submit">
                  Invite
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
