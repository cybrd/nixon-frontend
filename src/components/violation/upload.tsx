import { createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { parse } from "papaparse";

import { AuthContext } from "../../context/auth";
import { violationUploadFile } from "../../services/violation";

export const Upload = () => {
  const auth = useContext(AuthContext);

  const [csv, setCsv] = createSignal<unknown[]>([]);

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(violationUploadFile(csv(), auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
        setCsv([]);
      })
      .catch(console.error);
  };

  const read = (file: File) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setCsv(parse(reader.result as string).data)
    );

    reader.readAsText(file);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        <div class="form-group row p-1 align-items-center">
          <label for="inputUploadFile" class="col-sm-2 form-label text-end">
            Violation CSV
          </label>
          <div class="col-sm-4">
            <input
              id="inputUploadFile"
              type="file"
              accept=".csv"
              class="form-control"
              onInput={(e) => {
                const [file] = e.target.files as FileList;
                read(file);
              }}
            />
          </div>
        </div>

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
