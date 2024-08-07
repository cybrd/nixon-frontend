import { NavigateOptions, SetParams } from "@solidjs/router";
import { Setter, useContext } from "solid-js";

import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";

export const setParamsAndOptions =
  (
    setOptions: Setter<Query>,
    setParams: (params: SetParams, options?: Partial<NavigateOptions>) => void
  ) =>
  (newParams: Record<string, string>) => {
    const auth = useContext(AuthContext);

    const currentParams = Object.fromEntries(
      new URLSearchParams(document.location.search)
    );

    const updatedParams = {
      ...currentParams,
      ...newParams,
    };

    setParams(updatedParams);
    const query = new URLSearchParams(updatedParams).toString();
    setOptions({
      query,
      token: auth.user()?.token || "",
    });
  };

export type SetParamsAndOptions = ReturnType<typeof setParamsAndOptions>;
