import Icons from "../icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ActionBar({
  tooltip,
  notice,
  alert,
}: {
  tooltip?: string;
  notice?: string;
  alert?: string;
}) {
  return (
    <div className="flex gap-2 ml-auto">
      {notice && <Notice>{notice}</Notice>}
      {tooltip && <Tip>{tooltip}</Tip>}
      {alert && <Alert>{alert}</Alert>}
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Icons.notice className="cursor-pointer text-accent" />
        </PopoverTrigger>
        <PopoverContent>{children}</PopoverContent>
      </Popover>
    </>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Icons.help className="cursor-pointer text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Icons.alert className="cursor-pointer text-destructive-foreground animate-pulse" />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
