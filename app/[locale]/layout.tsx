import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import TooltipProvider from "@/providers/tooltip-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GeistMono } from "geist/font/mono";
import AuthProvider from "@/providers/session-provider";
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
  DashboardSidebar,
  DashboardWrapper,
} from "@/components/layout/dashboard";
import SidebarNavigation from "@/components/sidebar-navigation";
import Header from "@/components/header";
import { Suspense } from "react";
import LoadingLogo from "@/components/layout/loading-logo";
import { auth } from "@/lib/auth";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={GeistMono.className}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            // enableSystem={true}
            forcedTheme="dark"
            // disableTransitionOnChange
          >
            <AuthProvider>
              <TooltipProvider>
                <Dashboard className="bg-background dark:bg-background text-foreground">
                  <DashboardSidebar>
                    <SidebarNavigation session={session} />
                  </DashboardSidebar>
                  <DashboardWrapper>
                    <DashboardHeader>
                      <Header />
                    </DashboardHeader>
                    <DashboardContent>
                      <Suspense fallback={<LoadingLogo />}>
                        <main className="">{children}</main>
                      </Suspense>
                    </DashboardContent>
                  </DashboardWrapper>
                </Dashboard>

                <Toaster />
              </TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
