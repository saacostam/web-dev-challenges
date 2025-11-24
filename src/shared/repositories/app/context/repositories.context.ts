import { createContext } from "react";
import { IRepositories } from "../../domain";

export const RepositoryContext = createContext(null as unknown as IRepositories);
