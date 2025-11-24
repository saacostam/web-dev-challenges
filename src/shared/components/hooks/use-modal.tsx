import { InputHTMLAttributes, useCallback, useMemo } from "react";

import { twMerge } from "tailwind-merge";

import { getUuid } from "../../../features/string.utils";

export function useModal() {
  const id = useMemo(() => getUuid(), []);

  const Modal = useCallback(
    (props: InputHTMLAttributes<HTMLDialogElement>) => {
      const { children, className, ...rest } = props;
      return (
        <dialog {...rest} id={id} className={twMerge("modal", className)}>
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl">
                ✕
              </button>
            </form>
            {children}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      );
    },
    [id],
  );
  const openModal = useCallback(
    () =>
      (
        document.getElementById(id) as HTMLDialogElement | undefined
      )?.showModal(),
    [id],
  );

  return useMemo(
    () => ({
      Modal,
      openModal,
    }),
    [Modal, openModal],
  );
}
