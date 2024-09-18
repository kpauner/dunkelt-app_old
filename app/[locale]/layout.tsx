import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import TooltipProvider from "@/providers/tooltip-provider";
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
import IntlClientProvider from "@/providers/intl-client-provider";
import QueryProvider from "@/providers/query-provider";
import SheetProvider from "@/providers/sheet-provider";

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
        <IntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            // enableSystem={true}
            forcedTheme="dark"
            // disableTransitionOnChange
          >
            <QueryProvider>
              <AuthProvider>
                <TooltipProvider>
                  <Dashboard className="bg-background dark:bg-background text-foreground flex">
                    <DashboardSidebar>
                      <SidebarNavigation session={session} />
                    </DashboardSidebar>
                    <DashboardWrapper className="flex min-h-screen">
                      <DashboardHeader>
                        <Header />
                      </DashboardHeader>
                      <DashboardContent>
                        <Suspense fallback={<LoadingLogo />}>
                          {children}
                        </Suspense>
                      </DashboardContent>
                    </DashboardWrapper>
                  </Dashboard>
                  <SheetProvider />
                  <Toaster />
                </TooltipProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </IntlClientProvider>
      </body>
    </html>
  );
}
