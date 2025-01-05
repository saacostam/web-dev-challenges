import { v4 as uuid } from "uuid";
import { Identifider } from "../../core.types";

export function getUuid(): Identifider {
  return uuid();
}
