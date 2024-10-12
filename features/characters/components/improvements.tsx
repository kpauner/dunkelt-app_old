import * as React from "react";
import MultiTagSelect from "@/components/multi-tag-select";
import { useTranslations } from "next-intl";

export default function Improvements() {
  const t = useTranslations("playbooks");
  return (
    <div>
      <MultiTagSelect
        onChange={() => {}}
        value={[]}
        maxLength={2}
        suggestions={t
          .raw("thechosen.your_fate.heroic.options")
          .map((option: string) => ({
            label: option,
            value: option,
          }))}
      />
    </div>
  );
}
