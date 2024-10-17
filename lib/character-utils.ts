import { SelectcharacterImprovements } from "@/types/characters";

export const calculateRating = (
  attributes: SelectcharacterImprovements[],
  ratingType: string
) => {
  const initialRating =
    attributes.find((attr) => attr.type === ratingType && attr.initialRating)
      ?.value || "0";

  const improvements = attributes
    .filter((attr) => attr.type === ratingType && !attr.initialRating)
    .reduce((sum, attr) => sum + parseInt(attr.value), 0);

  return parseInt(initialRating) + improvements;
};
