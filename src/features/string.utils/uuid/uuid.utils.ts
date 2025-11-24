import { v4 as uuid } from "uuid";

import { Identifider } from "../../../shared/types";

export function getUuid(): Identifider {
  return uuid();
}
