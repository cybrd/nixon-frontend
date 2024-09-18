import {
  Index,
  Show,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { RiArrowsArrowDownSLine, RiArrowsArrowLeftSLine } from "solid-icons/ri";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { Combobox } from "@kobalte/core/combobox";
import { createStore } from "solid-js/store";

import { AuthContext } from "../../context/auth";
import { Employee } from "../../models/employee";
import { FilterOptionsContext } from "../../context/filter-options";
import { Query } from "../../models/query";
import { violationSummary } from "../../services/violation";

const ListHeader = () => (
  <tr>
    <th>Control #</th>
    <th>Date of Incident</th>
    <th>Description of the Incident</th>
    <th>Under</th>
    <th>Violation</th>
    <th>Action</th>
    <th>Number of Times</th>
  </tr>
);

const employeeData = (employee: Partial<Employee> = {}) => (
  <tr>
    <th colSpan={"100%"}>
      <table class="table table-striped table-hover table-bordered">
        <tbody>
          <tr>
            <td>Finger Print Id</td>
            <td>{employee.fingerPrintId}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{employee.department}</td>
          </tr>
          <tr>
            <td>Position</td>
            <td>{employee.position}</td>
          </tr>
        </tbody>
      </table>
    </th>
  </tr>
);

type DateFromTo = {
  dateFrom: string;
  dateTo: string;
};
export const Summary = () => {
  const auth = useContext(AuthContext);
  const filter = useContext(FilterOptionsContext);
  const params = useParams();
  const [fields, setFields] = createStore<Partial<DateFromTo>>({});
  const optionsFingerPrintId = filter.filterOptions().fingerPrintId;
  const [searchParams] = useSearchParams();
  const query = new URLSearchParams({
    dateFrom: searchParams.dateFrom || "",
    dateTo: searchParams.dateTo || "",
  }).toString();
  const [options, setOptions] = createSignal<Query>({
    id: params.id,
    query,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), violationSummary);
  const nav = useNavigate();

  const handleEmployeeChange = (id: string) => {
    const newQuery = new URLSearchParams({
      dateFrom: fields.dateFrom || "",
      dateTo: fields.dateTo || "",
    }).toString();
    setOptions({ ...options(), id, newQuery });
    nav(`/violation/summary/${id}?${newQuery.toString()}`);
  };

  const handleDateChange = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const newQuery = new URLSearchParams({
      dateFrom: fields.dateFrom || "",
      dateTo: fields.dateTo || "",
    }).toString();
    setOptions({ ...options(), query: newQuery });
    nav(`/violation/summary/${params.id}?${newQuery.toString()}`);
  };

  const comboboxOptions = [
    { label: "----", value: "" },
    ...Object.entries(optionsFingerPrintId).map(([k, v]) => ({
      label: v,
      value: k,
    })),
  ];
  const defaultValue = comboboxOptions.find((x) => params.id === x.value);

  return (
    <div>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr class="d-print-none">
            <th colSpan={"100%"}>
              <div>
                <label for="fingerPrintId" class="form-label">
                  Employee
                </label>
                <Combobox
                  class="d-inline-block"
                  options={comboboxOptions}
                  optionValue="value"
                  optionTextValue="label"
                  optionLabel="label"
                  name="fingerPrintId"
                  placeholder="fingerPrintId"
                  onChange={(e) => handleEmployeeChange(e?.value || "")}
                  defaultValue={defaultValue}
                  itemComponent={(props) => (
                    <Combobox.Item item={props.item} class="combobox__item">
                      <Combobox.ItemLabel>
                        {props.item.rawValue.label}
                      </Combobox.ItemLabel>
                      <Combobox.ItemIndicator class="combobox__item-indicator">
                        <RiArrowsArrowLeftSLine />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  )}
                >
                  <Combobox.Control
                    class="combobox__control"
                    aria-label="Fruit"
                  >
                    <Combobox.Input class="combobox__input" />
                    <Combobox.Trigger class="combobox__trigger">
                      <Combobox.Icon class="combobox__icon">
                        <RiArrowsArrowDownSLine />
                      </Combobox.Icon>
                    </Combobox.Trigger>
                  </Combobox.Control>
                  <Combobox.Portal>
                    <Combobox.Content class="combobox__content">
                      <Combobox.Listbox class="combobox__listbox" />
                    </Combobox.Content>
                  </Combobox.Portal>
                </Combobox>
              </div>
              <form onSubmit={handleDateChange}>
                <div>
                  <label for="dateFrom" class="form-label">
                    Date From
                  </label>
                  <input
                    type="date"
                    id="dateFrom"
                    onInput={(e) => setFields("dateFrom", e.target.value)}
                  />

                  <label for="dateTo" class="form-label">
                    Date To
                  </label>
                  <input
                    type="date"
                    id="dateTo"
                    onInput={(e) => setFields("dateTo", e.target.value)}
                  />

                  <button>Filter</button>
                </div>
              </form>
            </th>
          </tr>
          <Show when={data()?.employee}>{employeeData(data()?.employee)}</Show>
          <ListHeader />
        </thead>
        <tbody>
          <Index each={data()?.violations.data}>
            {(item) => (
              <tr>
                <td>{item().controlNumber}</td>
                <td>{item().dateOfIncident}</td>
                <td>{item().incidentDescription}</td>
                <td>{item().under}</td>
                <td>{item().violation}</td>
                <td>{item().action}</td>
                <td>{item().numberOfTimes}</td>
              </tr>
            )}
          </Index>
        </tbody>
      </table>
    </div>
  );
};
