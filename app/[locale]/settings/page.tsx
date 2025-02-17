import { PageLayout } from "@/components/layout/page-layout";
import ProfileForm from "@/components/settings/profile-form";
import SubNavigation from "@/components/sub-navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { settingsMenuItems } from "@/constants/navigation";
import { getUser } from "@/data-access/users";
import { auth } from "@/lib/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SettingsPage() {
  const session = await auth();
  const locale = getLocale();
  const t = await getTranslations(["settings", "common"]);

  if (!session?.user?.id) {
    redirect(`/${locale}/sign-in`);
  }
  const user = await getUser(session.user.id);
  if (!user) {
    redirect(`/${locale}/sign-in`);
  }

  return (
    <PageLayout
      variant="page"
      title="Settings"
      description="Manage your settings"
      className="flex flex-1 flex-col gap-4 md:gap-8 pt-8"
    >
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <SubNavigation menuItems={settingsMenuItems} session={session} />
        <div className="grid gap-6">
          <ProfileForm
            title={t("settings.profile.title")}
            description={t("settings.profile.description")}
            buttonText={t("common.save")}
            user={user}
          />

          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Plugins Directory</CardTitle>
              <CardDescription>
                The directory within your project, in which your plugins are
                located.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <Input
                  placeholder="Project Name"
                  defaultValue="/content/plugins"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="include" defaultChecked />
                  <label
                    htmlFor="include"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow administrators to change the directory.
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t border-border px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
