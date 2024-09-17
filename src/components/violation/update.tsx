import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { violationGet, violationUpdate } from "../../services/violation";
import { AuthContext } from "../../context/auth";
import { FilterOptionsContext } from "../../context/filter-options";
import { Violation } from "../../models/violation";
import moment from "moment";

const inputControlNumber = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  setFields("controlNumber", data()?.controlNumber);

  return (
    <div class="form-group row p-1 align-items-center">
      <label for="inputControlNumber" class="col-sm-2 form-label text-end">
        Control Number
      </label>
      <div class="col-sm-4">
        <input
          id="inputControlNumber"
          class="form-control"
          onInput={(e) => setFields("controlNumber", e.target.value)}
          value={data()?.controlNumber}
        />
      </div>
    </div>
  );
};

const selectEmployeeNumber = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  setFields("employeeNumber", data()?.employeeNumber);
  const filter = useContext(FilterOptionsContext);
  const options = filter.filterOptions().fingerPrintId;

  return (
    <div class="form-group row p-1">
      <label for="selectEmployeeNumber" class="col-sm-2 form-label text-end">
        Employee Number
      </label>
      <div class="col-sm-4">
        <select
          id="selectEmployeeNumber"
          onChange={(e) => setFields("employeeNumber", e.target.value)}
        >
          <option value="">----</option>
          {Object.entries(options).map(([k, v]) => {
            if (k === data()?.employeeNumber) {
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
    </div>
  );
};

const selectDepartmentHead = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  const filter = useContext(FilterOptionsContext);
  const options = filter.filterOptions().fingerPrintId;

  return (
    <div class="form-group row p-1">
      <label for="selectDepartmentHead" class="col-sm-2 form-label text-end">
        Department Head
      </label>
      <div class="col-sm-4">
        <select
          id="selectDepartmentHead"
          onChange={(e) => setFields("deptHead", e.target.value)}
        >
          <option value="">----</option>
          {Object.entries(options).map(([k, v]) => {
            const [_, employeeName] = v.split(" - ");

            if (employeeName === data()?.deptHead) {
              setFields("deptHead", k);

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
    </div>
  );
};

const inputDateOfIncident = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  const date = moment(data()?.dateOfIncident).format("yyyy-MM-DD");
  setFields("dateOfIncident", date);

  return (
    <div class="form-group row p-1 align-items-center">
      <label for="inputDateOfIncident" class="col-sm-2 form-label text-end">
        Date of Incident
      </label>
      <div class="col-sm-4">
        <input
          id="inputDateOfIncident"
          type="date"
          class="form-control"
          onInput={(e) => setFields("dateOfIncident", e.target.value)}
          value={date}
        />
      </div>
    </div>
  );
};

const inputTimeOfIncident = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  const time = moment(
    `${data()?.dateOfIncident} ${data()?.timeOfIncident}`
  ).format("HH:mm");
  setFields("timeOfIncident", time);

  return (
    <div class="form-group row p-1 align-items-center">
      <label for="inputTimeOfIncident" class="col-sm-2 form-label text-end">
        Time of Incident
      </label>
      <div class="col-sm-4">
        <input
          id="inputTimeOfIncident"
          type="time"
          class="form-control"
          onInput={(e) => setFields("timeOfIncident", e.target.value)}
          value={time}
        />
      </div>
    </div>
  );
};

const selectReportedBy = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  const filter = useContext(FilterOptionsContext);
  const options = filter.filterOptions().fingerPrintId;

  return (
    <div class="form-group row p-1">
      <label for="selectReportedBy" class="col-sm-2 form-label text-end">
        Reported By
      </label>
      <div class="col-sm-4">
        <select
          id="selectReportedBy"
          onChange={(e) => setFields("reportedBy", e.target.value)}
        >
          <option value="">----</option>
          {Object.entries(options).map(([k, v]) => {
            const [_, employeeName] = v.split(" - ");

            if (employeeName === data()?.reportedBy) {
              setFields("reportedBy", k);

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
    </div>
  );
};

const textareaIncidentDescription = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  setFields("incidentDescription", data()?.incidentDescription);

  return (
    <div class="form-group row p-1 align-items-center">
      <label
        for="inputIncidentDescription"
        class="col-sm-2 form-label text-end"
      >
        Incident Description
      </label>
      <div class="col-sm-4">
        <textarea
          id="inputIncidentDescription"
          class="form-control"
          onInput={(e) => setFields("incidentDescription", e.target.value)}
          value={data()?.incidentDescription}
        />
      </div>
    </div>
  );
};

const selectHandbook = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  const filter = useContext(FilterOptionsContext);
  const options = filter.filterOptions().handbook;

  return (
    <div class="form-group row p-1">
      <label for="selectHandbook" class="col-sm-2 form-label text-end">
        Handbook
      </label>
      <div class="col-sm-4">
        <select
          class="col-sm-12"
          id="selectHandbook"
          onChange={(e) => setFields("under", e.target.value)}
        >
          <option value="">----</option>
          {Object.entries(options).map(([k, v]) => {
            const handBookKey = `${data()?.under}-${data()?.violation}`;

            if (k === handBookKey) {
              setFields("under", k);

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
    </div>
  );
};

export const Update = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const query = new URLSearchParams({
    department: searchParams.department || "",
    fingerPrintId: searchParams.fingerPrintId || "",
    page: searchParams.page || "",
  }).toString();
  const navigate = useNavigate();

  const [data] = createResource(() =>
    violationGet(params.id, auth.user()?.token)
  );
  const [fields, setFields] = createStore<Partial<Violation>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(
        violationUpdate(params.id, fields as Violation, auth.user()?.token),
        {
          error: "An error occurred 😔",
          loading: "Loading",
          success: <b>Done</b>,
        }
      )
      .then(() => navigate(`/violation?${query}`))
      .catch(console.error);
  };

  return (
    <Show when={data()}>
      <div>
        <form id="form" onSubmit={submit}>
          {inputControlNumber(data, setFields)}
          {selectEmployeeNumber(data, setFields)}
          {selectDepartmentHead(data, setFields)}
          {inputDateOfIncident(data, setFields)}
          {inputTimeOfIncident(data, setFields)}
          {selectReportedBy(data, setFields)}
          {textareaIncidentDescription(data, setFields)}
          {selectHandbook(data, setFields)}

          <div class="col-sm-6 text-center">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </Show>
  );
};
