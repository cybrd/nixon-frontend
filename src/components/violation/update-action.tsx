import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { violationGet, violationUpdate } from "../../services/violation";
import { AuthContext } from "../../context/auth";
import { Violation } from "../../models/violation";

const textareaAction = (
  data: Resource<Violation>,
  setFields: SetStoreFunction<Partial<Violation>>
) => {
  setFields("action", data()?.action);

  return (
    <div class="form-group row p-1 align-items-center">
      <label for="action" class="col-sm-2 form-label text-end">
        Action
      </label>
      <div class="col-sm-4">
        <textarea
          id="action"
          class="form-control"
          onInput={(e) => setFields("action", e.target.value)}
          value={data()?.action || ""}
        />
      </div>
    </div>
  );
};

export const UpdateAction = () => {
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
        <table class="table table-striped table-hover table-bordered">
          <tbody>
            <tr>
              <td>Employee Number</td>
              <td>{data()?.employeeNumber}</td>
            </tr>
            <tr>
              <td>Employee Name</td>
              <td>{data()?.employeeName}</td>
            </tr>
            <tr>
              <td>Department</td>
              <td>{data()?.department}</td>
            </tr>
            <tr>
              <td>Control Number</td>
              <td>{data()?.controlNumber}</td>
            </tr>
          </tbody>
        </table>

        <form id="form" onSubmit={submit}>
          {textareaAction(data, setFields)}

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
