import { StatusCodes } from "http-status-codes";

import { Employee } from "../models/employee";
import { Query } from "../models/query";

export type EmployeeList = {
  counts: number;
  data: Employee[];
};
export const employeeList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/employee?${options.query}`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<EmployeeList> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const employeeGet = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<Employee> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const employeeCreate = (data: Employee, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/employee/create`, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const employeeUpdate = (id: string, data: Employee, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/employee/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const employeeDelete = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });
