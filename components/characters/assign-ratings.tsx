import React from "react";
import Heading from "../layout/heading";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type AssignRatingsProps = {
  character: any;
  updateCharacter: (newData: any) => void;
};
export default function AssignRatings({
  character,
  updateCharacter,
}: AssignRatingsProps) {
  return (
    <section>
      <header className="flex justify-between items-center py-4">
        <Heading as="h2" size="md">
          Assign Ratings
        </Heading>
        <Button>Add Rating</Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Look</CardTitle>
            <CardDescription>Rating 1 description</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rating 1</CardTitle>
            <CardDescription>Rating 1 description</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
