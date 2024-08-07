import { useContext } from "solid-js";

import { FilterOptionsContext } from "../../context/filter-options";

import { FilterOptions } from "../../models/filter-options";
import { SetParamsAndOptions } from "./params";
import { useSearchParams } from "@solidjs/router";

export const filterSelect = (
  setter: SetParamsAndOptions,
  key: keyof FilterOptions
) => {
  const [params] = useSearchParams();
  const filter = useContext(FilterOptionsContext);

  const options = filter.filterOptions()[key];

  return (
    <div class="mb-3">
      <label for={key} class="form-label">
        {key}
      </label>
      <select
        id={key}
        onChange={(e) => setter({ [key]: e.currentTarget.value, page: "1" })}
      >
        <option value="">----</option>
        {Object.entries(options).map(([k, v]) => {
          if (k === params[key]) {
            return (
              <option value={k} selected>
                {v}
              </option>
            );
          }

          return <option value={k}>{v}</option>;
        })}
      </select>
    </div>
  );
};
