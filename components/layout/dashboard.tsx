import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const Dashboard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-h-screen w-full flex-col", className)}
    {...props}
  />
));
Dashboard.displayName = "Dashboard";

const DashboardWrapper = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col sm:gap-4 sm:py-4 sm:pl-20", className)}
    {...props}
  />
));
DashboardWrapper.displayName = "DashboardWrapper";

const DashboardSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-primary-dark  sm:flex",
      className
    )}
    {...props}
  />
));
DashboardSidebar.displayName = "DashboardSidebar";

const DashboardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6",
      className
    )}
    {...props}
  />
));
DashboardHeader.displayName = "DashboardHeader";

const DashboardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DashboardTitle.displayName = "DashboardTitle";

const DashboardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-full p-4 sm:px-6 sm:py-0 md:gap-8", className)}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

const dashboardLayoutVariants = cva("mx-auto", {
  variants: {
    variant: {
      default: "w-full flex-1",
      page: "max-w-screen-xl flex flex-1 flex-col gap-4 md:gap-8 pt-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DashboardContentLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardLayoutVariants> {}

const DashboardContentLayout = React.forwardRef<
  HTMLDivElement,
  DashboardContentLayoutProps
>(({ className, variant, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(dashboardLayoutVariants({ variant, className }))}
    {...props}
  />
));
DashboardContentLayout.displayName = "DashboardContentLayout";

const DashboardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
DashboardFooter.displayName = "DashboardFooter";

export {
  Dashboard,
  DashboardSidebar,
  DashboardHeader,
  DashboardFooter,
  DashboardTitle,
  DashboardWrapper,
  DashboardContent,
  DashboardContentLayout,
};
