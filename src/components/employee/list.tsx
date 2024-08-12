import { Index, createResource, createSignal, useContext } from "solid-js";
import { useSearchParams } from "@solidjs/router";

import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { employeeList } from "../../services/employee";

import { filterSelect } from "../helper/filter-select";
import { pagination } from "../helper/pagination";
import { setParamsAndOptions } from "../helper/params";

export const List = () => {
  const auth = useContext(AuthContext);

  const [params, setParams] = useSearchParams();
  const query = new URLSearchParams({
    department: params.department || "",
    fingerPrintId: params.fingerPrintId || "",
    page: params.page || "",
  }).toString();

  const [options, setOptions] = createSignal<Query>({
    query,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), employeeList);

  return (
    <div>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th colSpan={"100%"}>
              {filterSelect(
                setParamsAndOptions(setOptions, setParams),
                "department"
              )}
              {filterSelect(
                setParamsAndOptions(setOptions, setParams),
                "fingerPrintId"
              )}
            </th>
          </tr>
          <tr>
            <th>Finger Print Id</th>
            <th>Department</th>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()?.data}>
            {(item) => (
              <tr>
                <td>{item().fingerPrintId}</td>
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
  );
};
