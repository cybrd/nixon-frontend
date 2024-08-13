import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useContext } from "solid-js";

import { AuthContext } from "../../context/auth";
import { FilterOptionsContext } from "../../context/filter-options";
import { Violation } from "../../models/violation";
import { violationCreate } from "../../services/violation";

const inputControlNumber = (
  setFields: SetStoreFunction<Partial<Violation>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputControlNumber" class="col-sm-2 form-label text-end">
      Control Number
    </label>
    <div class="col-sm-4">
      <input
        id="inputControlNumber"
        class="form-control"
        onInput={(e) => setFields("controlNumber", e.target.value)}
      />
    </div>
  </div>
);

const selectEmployeeNumber = (
  setFields: SetStoreFunction<Partial<Violation>>
) => {
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
          {Object.entries(options).map(([k, v]) => (
            <option value={k}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const selectDepartmentHead = (
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
          {Object.entries(options).map(([k, v]) => (
            <option value={k}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const inputDateOfIncident = (
  setFields: SetStoreFunction<Partial<Violation>>
) => (
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
      />
    </div>
  </div>
);

const inputTimeOfIncident = (
  setFields: SetStoreFunction<Partial<Violation>>
) => (
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
      />
    </div>
  </div>
);

const selectReportedBy = (setFields: SetStoreFunction<Partial<Violation>>) => {
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
          {Object.entries(options).map(([k, v]) => (
            <option value={k}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const textareaIncidentDescription = (
  setFields: SetStoreFunction<Partial<Violation>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputIncidentDescription" class="col-sm-2 form-label text-end">
      Incident Description
    </label>
    <div class="col-sm-4">
      <textarea
        id="inputIncidentDescription"
        class="form-control"
        onInput={(e) => setFields("incidentDescription", e.target.value)}
      />
    </div>
  </div>
);

const selectHandbook = (setFields: SetStoreFunction<Partial<Violation>>) => {
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
          {Object.entries(options).map(([k, v]) => (
            <option value={k}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const Create = () => {
  const auth = useContext(AuthContext);

  let [fields, setFields] = createStore<Partial<Violation>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(violationCreate(fields as Violation, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
        [fields, setFields] = createStore<Partial<Violation>>({});
      })
      .catch(console.error);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        {inputControlNumber(setFields)}
        {selectEmployeeNumber(setFields)}
        {selectDepartmentHead(setFields)}
        {inputDateOfIncident(setFields)}
        {inputTimeOfIncident(setFields)}
        {selectReportedBy(setFields)}
        {textareaIncidentDescription(setFields)}
        {selectHandbook(setFields)}

        <div class="col-sm-6 text-center">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};
