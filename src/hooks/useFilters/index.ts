import { FiltersContext } from "lush/context/filters";
import { useContext } from "react";

export const useFilters = () => useContext(FiltersContext);
