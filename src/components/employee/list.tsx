import { For, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { AuthContext } from "../../context/auth";
import { Employee } from "../../models/employee";
import { employeeList } from "../../services/employee";

export const List = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = createStore<Employee[]>([]);

  createEffect(() => {
    employeeList(auth.user()?.token).then((res) => setData(res));
  });

  return (
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Department</th>
          <th>Position</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <For each={data}>
          {(item) => (
            <tr>
              <td>{item.department}</td>
              <td>{item.position}</td>
              <td>{item.name}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
