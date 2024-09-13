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

    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      return path + " is not yet translated";
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
