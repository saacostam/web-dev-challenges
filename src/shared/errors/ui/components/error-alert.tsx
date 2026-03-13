import { PropsWithChildren } from "react";

import { Alert, Header } from "../../../../shared/components";
import { ExclamationCircleIcon } from "../../../../shared/icons";

export interface ErrorAlertProps {
  header: string;
  cta?: {
    label?: string;
    onClick: () => void;
    isPending: boolean;
  };
}

export function ErrorAlert({
  children,
  cta,
  header,
}: PropsWithChildren<ErrorAlertProps>) {
  return (
    <Alert className="alert-error">
      <Header className="flex gap-2 flex-row mb-2 text-error-content items-center">
        <ExclamationCircleIcon className="size-8" /> {header}
      </Header>
      <span className="text-error-content">{children}</span>
      {cta && (
        <div className="mt-2">
          <button
            className={`btn ${cta.isPending ? "btn-disabled" : ""}`}
            onClick={cta.onClick}
            disabled={cta.isPending}
          >
            {cta.label ?? "Refresh"}
          </button>
        </div>
      )}
    </Alert>
  );
}
