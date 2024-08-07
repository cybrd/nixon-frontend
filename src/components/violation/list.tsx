import { Index, createResource, createSignal, useContext } from "solid-js";
import { useSearchParams } from "@solidjs/router";

import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { violationList } from "../../services/violation";

import { pagination } from "../helper/pagination";
import { setParamsAndOptions } from "../helper/params";

const ListHeader = () => (
  <thead>
    <tr>
      <th>Control Number</th>
      <th>Employee Number</th>
      <th>Employee Name</th>
      <th>Department</th>
      <th>Position</th>
      <th>Department Head</th>
      <th>Date of Incident</th>
      <th>Time of Incident</th>
      <th>Reported By</th>
      <th>Incident Description</th>
      <th>Under</th>
      <th>Violation</th>
      <th>Description</th>
      <th>Penalty</th>
      <th>Number of Times</th>
    </tr>
  </thead>
);

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
  const [data] = createResource(() => options(), violationList);

  return (
    <div>
      <table class="table table-striped table-hover table-bordered">
        <ListHeader />
        <tbody>
          <Index each={data()?.data}>
            {(item) => (
              <tr>
                <td>{item().controlNumber}</td>
                <td>{item().employeeNumber}</td>
                <td>{item().employeeName}</td>
                <td>{item().department}</td>
                <td>{item().position}</td>
                <td>{item().deptHead}</td>
                <td>{item().dateOfIncident}</td>
                <td>{item().timeOfIncident}</td>
                <td>{item().reportedBy}</td>
                <td>{item().incidentDescription}</td>
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
