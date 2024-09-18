"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { DashboardContentLayout } from "@/components/layout/dashboard";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations("errors.page");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <DashboardContentLayout title={t("title")}>
      <div>
        {t.rich("description", {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              className="text-white underline underline-offset-2"
              onClick={reset}
              type="button"
            >
              {chunks}
            </button>
          ),
        })}
      </div>
    </DashboardContentLayout>
  );
}
