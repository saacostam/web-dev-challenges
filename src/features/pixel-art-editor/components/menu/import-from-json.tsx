import { useRef, useState } from "react";

import { Header } from "../../../../shared/components";
import { IEditorSnapshotService } from "../../types";

export interface ImportFromJsonProps {
  loadSnapshot: IEditorSnapshotService["loadSnapshot"];
  onCancel: () => void;
  onError: (e: unknown) => void;
  onSettled: () => void;
}

export function ImportFromJson({
  loadSnapshot,
  onCancel,
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

        <div className="flex flex-row justify-end mt-4 gap-2">
          <button className="btn block" onClick={onCancel} type="button">
            Cancel
          </button>
          <button
            className={`btn btn-primary block ${
              loadSnapshot.isPending ? "btn-disabled" : ""
            }`}
            disabled={loadSnapshot.isPending}
            type="reset"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}
