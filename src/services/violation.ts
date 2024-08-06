import { StatusCodes } from "http-status-codes";

export const violationList = (token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/violation`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });
