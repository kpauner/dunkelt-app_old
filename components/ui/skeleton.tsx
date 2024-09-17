import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: string | number;
};

function Skeleton({ className, height, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      style={{ height: height ? height : "auto", ...props.style }}
      {...props}
    />
  );
}

export { Skeleton };
