import { PlusIcon } from "@/shared/icons";

export interface AddFrameCtaProps {
  onClick(): void;
}

export function AddFrameCta({ onClick }: AddFrameCtaProps) {
  return (
    <button
      className="btn btn-xs btn-primary btn-outline w-full"
      onClick={onClick}
    >
      <PlusIcon className="size-5 stroke-2" />
    </button>
  );
}
