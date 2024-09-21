import { A, useSearchParams } from "@solidjs/router";
import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";

import { employeeDelete, employeeList } from "../../services/employee";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { filterSelect } from "../helper/filter-select";
import { pagination } from "../helper/pagination";
import { setParamsAndOptions } from "../helper/params";

export const List = () => {
  const [show, setShow] = createSignal(false);
  const [modalMessage, setModalMessage] = createSignal("");
  const [modalId, setModalId] = createSignal("");
  const handleOpen = (message: string, id: string) => {
    setModalMessage(message);
    setModalId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const auth = useContext(AuthContext);
  const [params, setParams] = useSearchParams();
  const query = new URLSearchParams({
    department: params.department || "",
    fingerPrintId: params.fingerPrintId || "",
    page: params.page || "",
  }).toString();
  const [options, setOptions] = createSignal<Query>({
    query,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), employeeList);

  const handleDelete = (id: string) => {
    toast
      .promise(employeeDelete(id, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Deleted</b>,
      })
      .then(() => {
        setParamsAndOptions(
          setOptions,
          setParams
        )({ page: params.page || "1" });
        handleClose();
      })
      .catch(console.error);
  };

  return (
    <>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th colSpan={"100%"}>
              {filterSelect(
                setParamsAndOptions(setOptions, setParams),
                "department"
              )}
              {filterSelect(
                setParamsAndOptions(setOptions, setParams),
                "fingerPrintId"
              )}
            </th>
          </tr>
          <tr>
            <th>Finger Print Id</th>
            <th>Department</th>
            <th>Position</th>
            <th>Name</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()?.data}>
            {(item) => (
              <tr>
                <td>{item().fingerPrintId}</td>
                <td>{item().department}</td>
                <td>{item().position}</td>
                <td>{item().name}</td>
                <td>
                  {auth.user().role === "admin" && (
                    <div>
                      <a
                        href="#"
                        onClick={() =>
                          handleOpen(item().fingerPrintId, item()._id)
                        }
                      >
                        Delete
                      </a>
                    </div>
                  )}
                  <div>
                    <A href={`/employee/${item()._id}?${options().query}`}>
                      Update
                    </A>
                  </div>
                </td>
              </tr>
            )}
          </Index>
        </tbody>
      </table>
      {pagination(setParamsAndOptions(setOptions, setParams), data()?.counts)}

      <Modal show={show()} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete(modalId())}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
};
