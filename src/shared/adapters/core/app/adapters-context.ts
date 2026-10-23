import { createContext } from "react";

import { IAdapters } from "@/shared/adapters/core/domain";

export const AdaptersContext = createContext(null as unknown as IAdapters);
