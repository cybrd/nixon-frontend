import {
  A,
  NavigateOptions,
  SetParams,
  useSearchParams,
} from "@solidjs/router";
import {
  For,
  JSX,
  Setter,
  Show,
  createResource,
  createSignal,
  useContext,
} from "solid-js";

import { AuthContext } from "../../context/auth";
import { employeeList } from "../../services/employee";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ONE, ZERO } from "../../constants";
import { Query } from "../../models/query";

const setParamsAndOptions =
  (
    setOptions: Setter<Query>,
    setParams: (params: SetParams, options?: Partial<NavigateOptions>) => void
  ) =>
  (newPage: number) => {
    setParams({ page: newPage });
    const auth = useContext(AuthContext);
    const query = new URLSearchParams({
      page: String(newPage),
    }).toString();

    setOptions({
      query,
      token: auth.user()?.token || "",
    });
  };

const prev = (setter: ReturnType<typeof setParamsAndOptions>) => {
  const [params] = useSearchParams();
  const currentPage = Number(params.page) || DEFAULT_PAGE;

  let element: JSX.Element;
  if (currentPage === DEFAULT_PAGE) {
    element = (
      <li class="page-item disabled">
        <A class="page-link" href="#">
          Previous
        </A>
      </li>
    );
  } else {
    element = (
      <li class="page-item">
        <a class="page-link" href="#" onClick={() => setter(currentPage - ONE)}>
          Previous
        </a>
      </li>
    );
  }

  return element;
};

const next = (
  setter: ReturnType<typeof setParamsAndOptions>,
  records: number
) => {
  const [params] = useSearchParams();
  const currentPage = Number(params.page) || DEFAULT_PAGE;
  const totalPages = records / DEFAULT_PAGE_SIZE;

  let element: JSX.Element;
  if (currentPage === totalPages) {
    element = (
      <li class="page-item disabled">
        <A class="page-link" href="#">
          Next
        </A>
      </li>
    );
  } else {
    element = (
      <li class="page-item">
        <a class="page-link" href="#" onClick={() => setter(currentPage + ONE)}>
          Next
        </a>
      </li>
    );
  }

  return element;
};

const pagination = (
  setter: ReturnType<typeof setParamsAndOptions>,
  records = ZERO
) => (
  <ul class="pagination justify-content-center">
    {prev(setter)}
    {next(setter, records)}
  </ul>
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
  const [data] = createResource(() => options(), employeeList);

  return (
    <Show when={params.page || "1"} keyed>
      <div>
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Department</th>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <For each={data()?.data}>
              {(item) => (
                <tr>
                  <td>{item.department}</td>
                  <td>{item.position}</td>
                  <td>{item.name}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        {pagination(setParamsAndOptions(setOptions, setParams), data()?.count)}
      </div>
    </Show>
  );
};
