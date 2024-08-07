import { StatusCodes } from "http-status-codes";

import { Query } from "../models/query";
import { Violation } from "../models/violation";

export type ViolationList = {
  counts: number;
  data: Violation[];
};

export const violationList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation?${options.query}`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== StatusCodes.OK) {
        throw res;
      }

      return res.json();
    })
    .then((res): ViolationList => res);
