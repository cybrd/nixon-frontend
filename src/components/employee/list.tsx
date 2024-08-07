import {
  Index,
  Show,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { useSearchParams } from "@solidjs/router";

import { pagination, setParamsAndOptions } from "../helper/pagination";
import { AuthContext } from "../../context/auth";
import { employeeList } from "../../services/employee";

import { Query } from "../../models/query";

export const List = () => {
  const auth = useContext(AuthContext);
  const [params, setParams] = useSearchParams();
  const query = new URLSearchParams({
    page: params.page || "",
  }).toString();

  const [options, setOptions] = createSignal<Query>({
    query,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), employeeList);

  return (
    <Show when={params.page || "1"} keyed>
      <div>
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Department</th>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <Index each={data()?.data}>
              {(item) => (
                <tr>
                  <td>{item().department}</td>
                  <td>{item().position}</td>
                  <td>{item().name}</td>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
        {pagination(setParamsAndOptions(setOptions, setParams), data()?.counts)}
      </div>
    </Show>
  );
};
