import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ListBoxRenderer,
  OptionRendererProps,
  ReactTags,
  Tag,
  TagRenderer,
  TagSuggestion,
} from "react-tag-autocomplete";
import Icons from "./icons";

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

  const tailwindClassNames = useMemo(
    () => ({
      root: "relative py-2 px-3 h-12 border-2 border-primary-dark bg-background shadow-sm focus-visible:ring-1 focus-visible:ring-stone-950 dark:border-primary-dark dark:focus-visible:ring-primary-foreground shadow-sm rounded-md",
      rootIsActive: "ring-1 ring-primary-light",
      rootIsDisabled: "opacity-50 cursor-not-allowed",
      rootIsInvalid: "ring-1 ring-red-500",
      label: "sr-only",
      tagList: "inline-flex flex-wrap items-center gap-2",
      tagListItem: "inline-flex",
      tag: "inline-flex items-center rounded-md tracking-wide border border-primary-dark px-2.5 py-0.5 text-xs font-semibold transition-colors dark:bg-accent-dark dark:text-accent dark:hover:bg-accent-dark/80 dark:border-accent/20",
      tagName: "mr-1",
      comboBox: "inline-block",
      input:
        "max-w-full placeholder:text-primary-light/60 bg-transparent m-0 p-0 outline-none ml-2 min-w-16",
      listBox:
        "absolute z-10 w-full mt-1 p-1 dark:border-muted dark:bg-primary-dark dark:text-stone-50 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm left-0 top-12",
      option:
        "cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-primary/80 rounded-sm flex items-center",
      optionIsActive: "bg-blue-100",
      highlight: "font-semibold",
    }),
    []
  );

  const renderListBox: ListBoxRenderer = useCallback(
    ({ children, classNames, ...props }) => {
      return (
        <div
          {...props}
          className={`${classNames.listBox} absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm`}
        >
          {children}
        </div>
      );
    },
    []
  );

  const renderOption = useCallback(
    ({ children, classNames, option, ...props }: OptionRendererProps) => {
      const isSelected = value.includes(String(option.value));
      return (
        <div
          {...props}
          className={`${classNames.option} ${props.className || ""} ${
            isSelected ? "bg-stone-800 " : ""
          }`}
        >
          {children}
          {isSelected && (
            <span className="ml-2">
              <Icons.check className="size-4" />
            </span>
          )}
        </div>
      );
    },
    [value]
  );

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
        renderListBox={renderListBox}
        renderOption={renderOption}
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
