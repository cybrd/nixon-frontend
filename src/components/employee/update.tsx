import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { employeeGet, employeeUpdate } from "../../services/employee";
import { AuthContext } from "../../context/auth";
import { Employee } from "../../models/employee";

const inputFingerPrintId = (
  data: Resource<Employee>,
  setFields: SetStoreFunction<Partial<Employee>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputFingerPrintId" class="col-sm-2 form-label text-end">
      Finger Print Id
    </label>
    <div class="col-sm-4">
      <input
        id="inputFingerPrintId"
        class="form-control"
        onInput={(e) => setFields("fingerPrintId", e.target.value)}
        value={data()?.fingerPrintId}
      />
    </div>
  </div>
);

const inputDepartment = (
  data: Resource<Employee>,
  setFields: SetStoreFunction<Partial<Employee>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputDepartment" class="col-sm-2 form-label text-end">
      Department
    </label>
    <div class="col-sm-4">
      <input
        id="inputDepartment"
        class="form-control"
        onInput={(e) => setFields("department", e.target.value)}
        value={data()?.department}
      />
    </div>
  </div>
);

const inputPosition = (
  data: Resource<Employee>,
  setFields: SetStoreFunction<Partial<Employee>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputPosition" class="col-sm-2 form-label text-end">
      Position
    </label>
    <div class="col-sm-4">
      <input
        id="inputPosition"
        class="form-control"
        onInput={(e) => setFields("position", e.target.value)}
        value={data()?.position}
      />
    </div>
  </div>
);

const inputName = (
  data: Resource<Employee>,
  setFields: SetStoreFunction<Partial<Employee>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputName" class="col-sm-2 form-label text-end">
      Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputName"
        class="form-control"
        onInput={(e) => setFields("name", e.target.value)}
        value={data()?.name}
      />
    </div>
  </div>
);

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
    employeeGet(params.id, auth.user()?.token)
  );
  const [fields, setFields] = createStore<Partial<Employee>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(
        employeeUpdate(params.id, fields as Employee, auth.user()?.token),
        {
          error: "An error occurred 😔",
          loading: "Loading",
          success: <b>Done</b>,
        }
      )
      .then(() => navigate(`/employee?${query}`))
      .catch(console.error);
  };

  return (
    <Show when={data()}>
      <div>
        <form id="form" onSubmit={submit}>
          {inputFingerPrintId(data, setFields)}
          {inputDepartment(data, setFields)}
          {inputPosition(data, setFields)}
          {inputName(data, setFields)}

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
