import {
  A,
  NavigateOptions,
  SetParams,
  useSearchParams,
} from "@solidjs/router";
import { JSX, Setter, useContext } from "solid-js";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ONE, ZERO } from "../../constants";

import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";

export const setParamsAndOptions =
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
  if (currentPage <= DEFAULT_PAGE) {
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
  const totalPages = Math.ceil(records / DEFAULT_PAGE_SIZE);

  let element: JSX.Element;
  if (currentPage >= totalPages) {
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

const select = (
  setter: ReturnType<typeof setParamsAndOptions>,
  records: number
) => {
  const [params] = useSearchParams();
  const currentPage = Number(params.page) || DEFAULT_PAGE;
  const totalPages = Math.ceil(records / DEFAULT_PAGE_SIZE);

  return (
    <li class="page-item">
      <select
        class="form-control"
        onChange={(e) => setter(Number(e.currentTarget.value))}
      >
        {[...Array(totalPages).keys()].map((i) => {
          const page = i + ONE;

          if (currentPage === page) {
            return <option selected>{page}</option>;
          }

          return <option>{page}</option>;
        })}
      </select>
    </li>
  );
};

export const pagination = (
  setter: ReturnType<typeof setParamsAndOptions>,
  records = ZERO
) => (
  <ul class="pagination justify-content-center">
    {prev(setter)}
    {select(setter, records)}
    {next(setter, records)}
  </ul>
);
