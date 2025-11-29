import { useRef, useState } from "react";

import { Header } from "../../../../shared/components";
import { useEditorSnapshot } from "../../providers";

export interface ImportFromJsonProps {
  loadSnapshot: ReturnType<typeof useEditorSnapshot>["loadSnapshot"];
  onError: (e: unknown) => void;
  onSettled: () => void;
}

export function ImportFromJson({
  loadSnapshot,
  onError,
  onSettled,
}: ImportFromJsonProps) {
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Header>Import from Json</Header>
      <form
        onSubmit={(e) => {
          setError(null);
          e.preventDefault();

          const file = fileRef.current?.files?.[0];
          if (!file) {
            setError("Unnable to load file");
            return;
          }

          loadSnapshot.onClick(file, {
            onSettled,
            onError,
          });
        }}
      >
        <input
          ref={fileRef}
          type="file"
          className="file-input file-input-primary w-full"
          required
        />
        {error && <div className="text-danger">{error}</div>}

        <button
          className={`btn btn-primary block ml-auto mt-4 ${
            loadSnapshot.isPending ? "btn-disabled" : ""
          }`}
          disabled={loadSnapshot.isPending}
        >
          Upload
        </button>
      </form>
    </>
  );
}
