"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CharacterFormValues } from "./character-form";
import { useState, useEffect } from "react";

type DateOfBirthFieldProps = {
  form: UseFormReturn<CharacterFormValues>;
  disabled?: boolean;
};

export function DateOfBirthField({ form, disabled }: DateOfBirthFieldProps) {
  const [year, setYear] = useState(
    form.getValues("dateOfBirth")?.split("-")[0] || ""
  );
  const [month, setMonth] = useState(
    form.getValues("dateOfBirth")?.split("-")[1] || ""
  );
  const [day, setDay] = useState(
    form.getValues("dateOfBirth")?.split("-")[2] || ""
  );

  useEffect(() => {
    const updateDOB = () => {
      if (year && month && day) {
        const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        form.setValue("dateOfBirth", dob);
      } else {
        form.setValue("dateOfBirth", "");
      }
    };
  }, [year, month, day, form]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <FormField
      control={form.control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Date of Birth</FormLabel>
          <div className="flex space-x-2">
            <FormControl>
              <Input
                placeholder="Year"
                disabled={disabled}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-24"
              />
            </FormControl>
            <FormControl>
              <Select
                disabled={disabled}
                value={month}
                onValueChange={setMonth}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, index) => (
                    <SelectItem
                      key={m}
                      value={(index + 1).toString().padStart(2, "0")}
                    >
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl>
              <Select disabled={disabled} value={day} onValueChange={setDay}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={d.toString().padStart(2, "0")}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
