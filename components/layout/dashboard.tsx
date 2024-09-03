import * as React from "react";

import { cn } from "@/lib/utils";

const Dashboard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-h-screen w-full flex-col bg-muted/40", className)}
    {...props}
  />
));
Dashboard.displayName = "Dashboard";

const DashboardWrapper = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
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
      "fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-primary-dark bg-primary sm:flex",
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

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const DashboardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8",
      className
    )}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Dashboard,
  DashboardSidebar,
  DashboardHeader,
  CardFooter,
  CardTitle,
  DashboardWrapper,
  DashboardContent,
};
