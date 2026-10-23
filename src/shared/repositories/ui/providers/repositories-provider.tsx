import { PropsWithChildren, useMemo } from "react";

import { IBrandingRepository } from "@/features/branding/domain";
import { BrandingRepository } from "@/features/branding/infra";
import { RepositoryContext } from "@/shared/repositories/app";
import { IRepositories } from "@/shared/repositories/domain";

export function RepositoriesProvider({ children }: PropsWithChildren) {
  const brandingRepository: IBrandingRepository = useMemo(
    () => new BrandingRepository(),
    [],
  );

  const repositories: IRepositories = useMemo(
    () => ({
      brandingRepository,
    }),
    [brandingRepository],
  );

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
}
