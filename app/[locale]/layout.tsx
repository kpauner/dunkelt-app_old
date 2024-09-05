import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import TooltipProvider from "@/providers/tooltip-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GeistMono } from "geist/font/mono";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
            <TooltipProvider>
              <main className="bg-background dark:bg-background text-foreground">
                {children}
              </main>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
