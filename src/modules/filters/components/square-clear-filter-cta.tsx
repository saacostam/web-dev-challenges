import { Link } from "react-router-dom";
import { FilterIcon, XCircleIcon } from "../../icons";

export interface SquareClearFilterCtaProps {
  clearFilterHref: string;
}

export function SquareClearFilterCta({
  clearFilterHref,
}: SquareClearFilterCtaProps) {
  return (
    <div className="tooltip" data-tip="Clear Filter">
      <Link className="btn btn-square btn-ghost group" to={clearFilterHref}>
        <FilterIcon className="group-hover:hidden" />
        <XCircleIcon className="hidden group-hover:block size-5" />
      </Link>
    </div>
  );
}
