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

export const violationGet = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== StatusCodes.OK) {
        throw res;
      }

      return res.json();
    })
    .then((res): Violation => res);

export const violationCreate = (data: Violation, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation/create`, {
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

export const violationUpdate = (id: string, data: Violation, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation/${id}`, {
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

export const violationDelete = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation/${id}`, {
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

export const violationUploadFile = (arrayStr: unknown[], token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation/upload`, {
    body: JSON.stringify(arrayStr),
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
