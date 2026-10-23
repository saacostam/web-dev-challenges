import { createContext } from "react";

import { IRepositories } from "@/shared/repositories/domain";

export const RepositoryContext = createContext(
  null as unknown as IRepositories,
);
