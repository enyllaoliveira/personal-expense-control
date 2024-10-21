import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "text"
    | "error"
    | "destructive"
    | "link";
  children: ReactNode;
  isLoading?: boolean;
  isLoadingShort?: boolean;
}
