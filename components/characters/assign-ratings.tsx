import React from "react";
import Heading from "../layout/heading";
import { Button } from "../ui/button";

type AssignRatingsProps = {
  character: any;
  updateCharacter: (newData: any) => void;
};
export default function AssignRatings({
  character,
  updateCharacter,
}: AssignRatingsProps) {
  return (
    <div>
      <Heading as="h2">Assign Ratings</Heading>
    </div>
  );
}
