import { ReactNode } from "react";

import { Header } from "./header";
import { Paragraph } from "./paragraph";

export interface ConfirmationModalProps {
  header: string;
  description?: ReactNode;
  primaryButton: {
    label: string;
    onClick: () => void;
  };
  secondaryButton: {
    label: string;
    onClick: () => void;
  };
  order: "primary-secondary" | "secondary-primary";
}

export function ConfirmationModal({
  header,
  description,
  primaryButton,
  secondaryButton,
  order,
}: ConfirmationModalProps) {
  return (
    <>
      <Header>{header}</Header>
      <Paragraph>{description}</Paragraph>
      <div
        className={`flex justify-end gap-2 ${order === "primary-secondary" ? "flex-row" : "flex-row-reverse"}`}
      >
        <button className="btn btn-primary" onClick={primaryButton.onClick}>
          {primaryButton.label}
        </button>
        <button className="btn" onClick={secondaryButton.onClick}>
          {secondaryButton.label}
        </button>
      </div>
    </>
  );
}
