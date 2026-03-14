import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-bg-main hover:bg-accent-light focus:ring-accent-primary",
  secondary:
    "border border-accent-secondary/50 bg-bg-card text-text-main hover:border-accent-primary hover:bg-accent-primary/10 focus:ring-accent-primary",
  ghost:
    "bg-transparent text-text-main hover:bg-bg-card focus:ring-accent-secondary",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-main disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
