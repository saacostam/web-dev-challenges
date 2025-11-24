import { PropsWithChildren, useMemo } from "react";
import { RepositoryContext } from "../../app";
import { IRepositories } from "../../domain";
import { IBrandingRepository } from "../../../../features/branding/domain";
import { BrandingRepository } from "../../../../features/branding/infra";

export function RepositoriesProvider({
  children,
}: PropsWithChildren) {
  const brandingRepository: IBrandingRepository = useMemo(() => new BrandingRepository(), []);
  
  const repositories: IRepositories = useMemo(() => ({
    brandingRepository,
  }), [brandingRepository])

  return <RepositoryContext.Provider value={repositories}>
    {children}
  </RepositoryContext.Provider>
}
