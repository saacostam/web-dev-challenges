import { Input } from "../../../shared/components";
import { SearchIcon } from "../../icons";

export function SearchBar() {
  return (
    <Input
      type="text"
      wrapperClassName="grow"
      className="grow"
      placeholder="Search..."
      icon={<SearchIcon />}
    />
  );
}
