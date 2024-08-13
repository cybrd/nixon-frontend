import { Index, createResource, createSignal, useContext } from "solid-js";
import { useSearchParams } from "@solidjs/router";

import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { filterSelect } from "../helper/filter-select";
import { pagination } from "../helper/pagination";
import { setParamsAndOptions } from "../helper/params";
import { violationSummary } from "../../services/violation";

const ListHeader = () => (
  <tr>
    <th>Employee Number</th>
    <th>Employee Name</th>
    <th>Department</th>
    <th>Position</th>
    <th>Under</th>
    <th>Violation</th>
    <th>Description</th>
    <th>Penalty</th>
    <th>Number of Times</th>
  </tr>
);

export const Summary = () => {
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
  const [data] = createResource(() => options(), violationSummary);

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
          <ListHeader />
        </thead>
        <tbody>
          <Index each={data()?.data}>
            {(item) => (
              <tr>
                <td
                  onClick={() => {
                    setParamsAndOptions(
                      setOptions,
                      setParams
                    )({ fingerPrintId: item().employeeNumber, page: "1" });
                  }}
                >
                  {item().employeeNumber}
                </td>
                <td>{item().employeeName}</td>
                <td>{item().department}</td>
                <td>{item().position}</td>
                <td>{item().under}</td>
                <td>{item().violation}</td>
                <td>{item().description}</td>
                <td>{item().penalty}</td>
                <td>{item().numberOfTimes}</td>
              </tr>
            )}
          </Index>
        </tbody>
      </table>
      {pagination(setParamsAndOptions(setOptions, setParams), data()?.counts)}
    </div>
  );
};
