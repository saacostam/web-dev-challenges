import { createContext } from "react";

import { IAdapters } from "../domain";

export const AdaptersContext = createContext(null as unknown as IAdapters);
