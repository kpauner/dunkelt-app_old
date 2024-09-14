"use client";

import { NextIntlClientProvider, IntlErrorCode, IntlError } from "next-intl";

type IntlClientProviderProps = {
  messages: any;
  locale: string;
  children: React.ReactNode;
};

export default function IntlClientProvider({
  messages,
  locale,
  children,
}: IntlClientProviderProps) {
  function onError(error: Error) {
    if (
      error instanceof IntlError &&
      error.code === IntlErrorCode.MISSING_MESSAGE
    ) {
      console.error(error);
    } else {
      console.error("Unhandled error in translation:", error);
    }
  }

  function getMessageFallback({
    namespace,
    key,
    error,
  }: {
    namespace?: string;
    key: string;
    error: IntlError;
  }) {
    const path = [namespace, key].filter((part) => part != null).join(".");
    const rawKey = key.split(".").slice(-2)[0];
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      return rawKey;
    } else {
      return "Dear developer, please fix this message: " + path;
    }
  }

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      onError={onError}
      getMessageFallback={getMessageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
}
