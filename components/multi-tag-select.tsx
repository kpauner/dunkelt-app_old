import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactTags, Tag, TagSuggestion } from "react-tag-autocomplete";

export default function MultiTagSelect({
  suggestions,
  onChange,
  value,
  maxLength = 2,
}: {
  suggestions: TagSuggestion[];
  onChange: (value: string[]) => void;
  value: string[];
  maxLength: number;
}) {
  const onAdd = useCallback(
    (newTag: Tag) => {
      if (value.length < maxLength) {
        const newValue = [...value, newTag.label];
        onChange(newValue);
      }
    },
    [value, onChange, maxLength]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      const newValue = value.filter((_, i) => i !== tagIndex);
      onChange(newValue);
    },
    [value, onChange]
  );

  const tailwindClassNames = {
    root: "relative py-2 px-3 h-12 border-2 border-primary-dark bg-background shadow-sm focus-visible:ring-1 focus-visible:ring-stone-950 dark:border-primary-dark dark:focus-visible:ring-primary-foreground shadow-sm rounded-md",
    rootIsActive: "ring-2 ring-blue-500",
    rootIsDisabled: "opacity-50 cursor-not-allowed",
    rootIsInvalid: "ring-2 ring-red-500",
    label: "sr-only", // Visually hide the label
    tagList: "inline-flex flex-wrap items-center gap-2", // Changed to inline-flex and added items-center
    tagListItem: "inline-flex", // Changed to inline-flex
    tag: "inline-flex items-center rounded-md tracking-wide border border-primary-dark px-2.5 py-0.5 text-xs font-semibold transition-colors dark:bg-accent-dark dark:text-accent dark:hover:bg-accent-dark/80 dark:border-accent/20",
    tagName: "mr-1",
    comboBox: "inline-block",
    input: "max-w-full placeholder:text-primary-light/30 bg-none m-0 p-0",
    listBox:
      "absolute z-10 w-full mt-1 capitalize dark:border-muted dark:bg-primary-dark dark:text-stone-50 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm -left-2 -right-2",
    option:
      "cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100",
    optionIsActive: "bg-blue-100",
    highlight: "font-semibold",
  };

  return (
    <>
      <ReactTags
        selected={value.map((v) => ({ label: v, value: v }))}
        suggestions={suggestions}
        onAdd={onAdd}
        allowNew={value.length < 2}
        onDelete={onDelete}
        noOptionsText="No matching heroic deeds"
        classNames={tailwindClassNames}
      />
      {value.length < maxLength ? (
        <p id="error" style={{ color: "#fd5956" }}>
          You must to select {maxLength - value.length} more tags
        </p>
      ) : null}
      {value.length > maxLength ? (
        <p id="error" style={{ color: "#fd5956" }}>
          You must remove {value.length - maxLength} tags
        </p>
      ) : null}
    </>
  );
}
