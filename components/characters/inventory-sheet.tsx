import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Icons from "../icons";

type InventorySheetProps = {
  title: string;
  description: string;
  buttonText: string;
  children: React.ReactNode;
};

export default function InventorySheet({
  title,
  description,
  buttonText,
  children,
}: InventorySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div>o</div>
        {children}
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" type="submit">
              {buttonText}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
