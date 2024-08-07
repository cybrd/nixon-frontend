import { ParentComponent, Show, useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { AuthContext } from "../context/auth";
import { FilterOptionsContext } from "../context/filter-options";
import { Menu } from "./menu";
import { filterOptionsList } from "../services/filter-options";

export const Protected: ParentComponent = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const filter = useContext(FilterOptionsContext);
  const username = auth.user()?.username;

  if (!username) {
    console.log("to login");
    navigate("/login");
  }

  if (!filter.filterOptions().department.length) {
    filterOptionsList(auth.user()?.token)
      .then((res) => filter.setFilterOptions(res))
      .catch(console.error);
  }

  return (
    <div class="vh-100 d-flex flex-column overflow-hidden">
      <div class="flex-fill d-flex flex-row overflow-auto">
        <div class="d-flex flex-column">
          <Menu />
        </div>

        <div class="flex-fill p-3 overflow-auto">
          <Show when={filter.filterOptions().department.length}>
            {props.children}
          </Show>
        </div>
      </div>
    </div>
  );
};
