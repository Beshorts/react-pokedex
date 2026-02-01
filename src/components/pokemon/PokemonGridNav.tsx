import DropDown from "../DropDown";
import { GridIcon } from "../icons/GridIcon";
import { ListIcon } from "../icons/ListIcon";
import { SortByIcon } from "../icons/SortByIcon";
import { MyButton } from "../shared/MyButton";

export function PokemonGridNav() {

  return (
    <>
      <nav className="flex justify-end p-0 py-4 sm:justify-between" aria-label="View options">
        <div className="flex gap-2">
          <MyButton className="hidden sm:flex" variant="primary" ariaLabel="Grid view">
            <GridIcon />
          </MyButton>
          <MyButton className="hidden sm:flex" type="button" variant="secondary" ariaLabel="List view">
            <ListIcon />
          </MyButton>
        </div>
        <div className="hidden gap-4 items-center sm:flex">
          <p className="text-body-md">Sort by:</p>
          <DropDown
            label={"Lowest number"}
            options={["Highest number", "Lowest number"]}
          />
        </div>
        <MyButton className="inline-flex border-none text-charcoal-100 sm:hidden" type="button" variant="secondary" ariaLabel="Sort by">
          <SortByIcon />
        </MyButton>
      </nav>
    </>
  );
}
