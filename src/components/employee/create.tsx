import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useContext } from "solid-js";

import { AuthContext } from "../../context/auth";
import { Employee } from "../../models/employee";
import { FilterOptionsContext } from "../../context/filter-options";
import { employeeCreate } from "../../services/employee";

const inputFingerPrintId = (setFields: SetStoreFunction<Partial<Employee>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputFingerPrintId" class="col-sm-2 form-label text-end">
      Finger Print Id
    </label>
    <div class="col-sm-4">
      <input
        id="inputFingerPrintId"
        class="form-control"
        onInput={(e) => setFields("fingerPrintId", e.target.value)}
      />
    </div>
  </div>
);

const selectDepartment = (setFields: SetStoreFunction<Partial<Employee>>) => {
  const filter = useContext(FilterOptionsContext);
  const options = filter.filterOptions().department;

  return (
    <div class="form-group row p-1">
      <label for="selectDepartment" class="col-sm-2 form-label text-end">
        Department
      </label>
      <div class="col-sm-4">
        <select
          id="selectDepartment"
          onChange={(e) => setFields("department", e.target.value)}
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

const inputPosition = (setFields: SetStoreFunction<Partial<Employee>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputPosition" class="col-sm-2 form-label text-end">
      Position
    </label>
    <div class="col-sm-4">
      <input
        id="inputPosition"
        class="form-control"
        onInput={(e) => setFields("position", e.target.value)}
      />
    </div>
  </div>
);

const inputName = (setFields: SetStoreFunction<Partial<Employee>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputName" class="col-sm-2 form-label text-end">
      Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputName"
        class="form-control"
        onInput={(e) => setFields("name", e.target.value)}
      />
    </div>
  </div>
);

export const Create = () => {
  const auth = useContext(AuthContext);

  let [fields, setFields] = createStore<Partial<Employee>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(employeeCreate(fields as Employee, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
        [fields, setFields] = createStore<Partial<Employee>>({});
      })
      .catch(console.error);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        {inputFingerPrintId(setFields)}
        {selectDepartment(setFields)}
        {inputPosition(setFields)}
        {inputName(setFields)}

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
