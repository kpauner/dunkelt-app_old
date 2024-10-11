import React, { useState, useRef, useEffect } from "react";
import Icons from "./icons";
import { cn } from "@/lib/utils";
import { inputVariants } from "./ui/input";
import { Badge } from "./ui/badge";

type Tag = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  suggestions: Tag[];
  onChange: (value: string[]) => void;
  value: string[];
  maxLength: number;
};

export default function MultiSelect({
  suggestions,
  onChange,
  value,
  maxLength,
}: MultiSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  // Convert value array to lowercase for case-insensitive comparison
  const lowercaseValue = value.map((v) => v.toLowerCase());

  useEffect(() => {
    if (inputValue) {
      setFilteredSuggestions(
        suggestions.filter((s) =>
          s.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [inputValue, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleTagClick = (tag: Tag) => {
    const lowercaseTagValue = tag.value.trim().toLowerCase();
    if (lowercaseValue.includes(lowercaseTagValue)) {
      // Remove the tag if it's already selected
      onChange(
        value.filter((v) => v.trim().toLowerCase() !== lowercaseTagValue)
      );
    } else if (value.length < maxLength) {
      // Add the tag if it's not selected and we haven't reached maxLength
      onChange([...value, tag.value]);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(
      value.filter(
        (v) => v.trim().toLowerCase() !== tagToRemove.trim().toLowerCase()
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue && filteredSuggestions.length > 0) {
      handleTagClick(filteredSuggestions[0]);
    }
  };

  return (
    <div className="relative">
      <div className="relative py-2 px-3 h-12 border-2 border-primary-dark bg-background focus-within:ring-1 focus-within:ring-stone-950 dark:border-primary-dark dark:focus-within:ring-primary-foreground shadow-sm rounded-md flex flex-wrap items-center gap-2">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-xs cursor-pointer"
            >
              <Icons.delete className="size-4" />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="flex-grow bg-transparent outline-none placeholder:text-primary-light/60"
          placeholder={value.length < maxLength ? "Add a tag" : ""}
        />
      </div>
      {isOpen && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 p-1 capitalize dark:border-muted dark:bg-primary-dark dark:text-stone-50 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm left-0 top-12 bg-white border border-gray-300">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.value}
              onClick={() => handleTagClick(suggestion)}
              className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-primary/80 rounded-sm flex items-center ${
                lowercaseValue.includes(suggestion.value.toLowerCase())
                  ? "bg-stone-800 text-white"
                  : ""
              }`}
            >
              {suggestion.label}
              {lowercaseValue.includes(suggestion.value.toLowerCase()) && (
                <span className="ml-2">
                  <Icons.check className="size-4" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {value.length < maxLength ? (
        <p id="error" style={{ color: "#fd5956" }}>
          You must select {maxLength - value.length} more tag(s)
        </p>
      ) : null}
      {value.length > maxLength ? (
        <p id="error" style={{ color: "#fd5956" }}>
          You must remove {value.length - maxLength} tag(s)
        </p>
      ) : null}
    </div>
  );
}
