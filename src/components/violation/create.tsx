import { SetStoreFunction, createStore } from "solid-js/store";
import { createSignal, useContext } from "solid-js";

import { AuthContext } from "../../context/auth";
import { FilterOptionsContext } from "../../context/filter-options";
import { Violation } from "../../models/violation";
import { violationCreate } from "../../services/violation";

const controlNumberInput = (
  setFields: SetStoreFunction<Partial<Violation>>
) => (
  <div class="form-group row p-1">
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

const employeeNumberInput = (
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  const filter = useContext(FilterOptionsContext);
  const options = filter.filterOptions().fingerPrintId;

  return (
    <div class="form-group row p-1">
      <label for="inputEmployeeNumber" class="col-sm-2 form-label text-end">
        Employee Number
      </label>
      <div class="col-sm-4">
        <select
          id="inputEmployeeNumber"
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
const showError = (error: string) => {
  if (error) {
    return <div class="mb-3">{error}</div>;
  }

  return <></>;
};

export const Create = () => {
  const auth = useContext(AuthContext);

  const [fields, setFields] = createStore<Partial<Violation>>({});
  const [error, setError] = createSignal("");

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    violationCreate(fields as Violation, auth.user()?.token).catch((e) => {
      console.error(e);
      setError(e);
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        {controlNumberInput(setFields)}
        {employeeNumberInput(setFields)}

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        {showError(error())}
      </form>
    </div>
  );
};
