import {
  Index,
  Show,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { AuthContext } from "../../context/auth";
import { Employee } from "../../models/employee";
import { FilterOptionsContext } from "../../context/filter-options";
import { Query } from "../../models/query";
import { pagination } from "../helper/pagination";
import { setParamsAndOptions } from "../helper/params";
import { violationSummary } from "../../services/violation";

const ListHeader = () => (
  <tr>
    <th>Under</th>
    <th>Violation</th>
    <th>Description</th>
    <th>Penalty</th>
    <th>Number of Times</th>
  </tr>
);

const employeeData = (employee: Partial<Employee> = {}) => (
  <tr>
    <th colSpan={"100%"}>
      <table class="table table-striped table-hover table-bordered">
        <tbody>
          <tr>
            <td>Finger Print Id</td>
            <td>{employee.fingerPrintId}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{employee.department}</td>
          </tr>
          <tr>
            <td>Position</td>
            <td>{employee.position}</td>
          </tr>
        </tbody>
      </table>
    </th>
  </tr>
);

export const Summary = () => {
  const auth = useContext(AuthContext);
  const filter = useContext(FilterOptionsContext);
  const params = useParams();
  const optionsFingerPrintId = filter.filterOptions().fingerPrintId;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = new URLSearchParams({
    fingerPrintId: searchParams.fingerPrintId || "",
    page: searchParams.page || "",
  }).toString();
  const [options, setOptions] = createSignal<Query>({
    id: params.id,
    query,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), violationSummary);
  const nav = useNavigate();

  const handleEmployeeChange = (id: string) => {
    setOptions({ ...options(), id });
    nav(`/violation/summary/${id}`);
  };

  return (
    <div>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th colSpan={"100%"}>
              <select
                id="fingerPrintId"
                onChange={(e) => handleEmployeeChange(e.currentTarget.value)}
              >
                <option value="">----</option>
                {Object.entries(optionsFingerPrintId).map(([k, v]) => {
                  if (k === params.id) {
                    return (
                      <option value={k} selected>
                        {v}
                      </option>
                    );
                  }

                  return <option value={k}>{v}</option>;
                })}
              </select>
            </th>
          </tr>
          <Show when={data()?.employee}>{employeeData(data()?.employee)}</Show>
          <ListHeader />
        </thead>
        <tbody>
          <Index each={data()?.violations.data}>
            {(item) => (
              <tr>
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
      {pagination(
        setParamsAndOptions(setOptions, setSearchParams),
        data()?.violations.counts
      )}
    </div>
  );
};