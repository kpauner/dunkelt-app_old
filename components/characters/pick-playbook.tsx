import React from "react";
import Heading from "../layout/heading";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import { truncateText } from "@/lib/utils";

type PickPlaybookProps = {
  character: any;
  updateCharacter: (newData: any) => void;
};
export default function PickPlaybook({
  character,
  updateCharacter,
}: PickPlaybookProps) {
  const t = useTranslations("playbook");
  return (
    <div>
      <Heading as="h2">Pick Playbook</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{t("thechosenone.title")}</CardTitle>
              <CardDescription>
                {truncateText(t("thechosenone.description"), 70)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
