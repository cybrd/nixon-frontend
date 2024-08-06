import { StatusCodes } from "http-status-codes";

export const handbookList = (token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/handbook`, {
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
