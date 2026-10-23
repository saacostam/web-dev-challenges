import { Link } from "react-router-dom";

import { XCircleIcon } from "@/shared/icons";

export interface SquareClearFilterCtaProps {
  clearFilterHref: string;
}

export function SquareClearFilterCta({
  clearFilterHref,
}: SquareClearFilterCtaProps) {
  return (
    <div className="tooltip" data-tip="Clear Filter">
      <Link className="btn btn-square btn-ghost group" to={clearFilterHref}>
        <XCircleIcon className="size-5" />
      </Link>
    </div>
  );
}
