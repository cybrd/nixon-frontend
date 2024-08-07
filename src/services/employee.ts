import { StatusCodes } from "http-status-codes";

import { Employee } from "../models/employee";
import { Query } from "../models/query";

export type EmployeeList = {
  count: number;
  data: Employee[];
};
export const employeeList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/employee?${options.query}`, {
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
    .then((res): EmployeeList => res);
