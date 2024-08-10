import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { useSearchParams } from "@solidjs/router";

import { violationDelete, violationList } from "../../services/violation";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { filterSelect } from "../helper/filter-select";
import { pagination } from "../helper/pagination";
import { setParamsAndOptions } from "../helper/params";

const ListHeader = () => (
  <thead>
    <tr>
      <th>Control Number</th>
      <th>Employee Number</th>
      <th>Employee Name</th>
      <th>Department</th>
      <th>Position</th>
      <th>Department Head</th>
      <th>Date of Incident</th>
      <th>Time of Incident</th>
      <th>Reported By</th>
      <th>Incident Description</th>
      <th>Under</th>
      <th>Violation</th>
      <th>Description</th>
      <th>Penalty</th>
      <th>Number of Times</th>
      <th>Actions</th>
    </tr>
  </thead>
);

export const List = () => {
  const [show, setShow] = createSignal(false);
  const [modalMessage, setModalMessage] = createSignal("");
  const [modalId, setmodalId] = createSignal("");
  const handleOpen = (message: string, id: string) => {
    setModalMessage(message);
    setmodalId(id);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

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
  const [data] = createResource(() => options(), violationList);

  const handleDelete = (id: string) => {
    toast
      .promise(violationDelete(id, auth.user()?.token), {
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
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      {filterSelect(setParamsAndOptions(setOptions, setParams), "department")}
      {filterSelect(
        setParamsAndOptions(setOptions, setParams),
        "fingerPrintId"
      )}
      <table class="table table-striped table-hover table-bordered">
        <ListHeader />
        <tbody>
          <Index each={data()?.data}>
            {(item) => (
              <tr>
                <td>{item().controlNumber}</td>
                <td
                  onClick={() => {
                    setParamsAndOptions(
                      setOptions,
                      setParams
                    )({ fingerPrintId: item().employeeNumber, page: "1" });
                  }}
                >
                  {item().employeeNumber}
                </td>
                <td>{item().employeeName}</td>
                <td>{item().department}</td>
                <td>{item().position}</td>
                <td>{item().deptHead}</td>
                <td>{item().dateOfIncident}</td>
                <td>{item().timeOfIncident}</td>
                <td>{item().reportedBy}</td>
                <td>{item().incidentDescription}</td>
                <td>{item().under}</td>
                <td>{item().violation}</td>
                <td>{item().description}</td>
                <td>{item().penalty}</td>
                <td>{item().numberOfTimes}</td>
                <td>
                  <a
                    href="#"
                    onClick={() => handleOpen(item().controlNumber, item()._id)}
                  >
                    Delete
                  </a>
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
    </div>
  );
};
