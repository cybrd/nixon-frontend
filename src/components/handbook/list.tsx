import { For, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { AuthContext } from "../../context/auth";
import { Handbook } from "../../models/handbook";
import { handbookList } from "../../services/handbook";

export const List = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = createStore<Handbook[]>([]);

  createEffect(() => {
    handbookList(auth.user()?.token).then((res) => setData(res));
  });

  return (
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Under</th>
          <th>Violation</th>
          <th>Description</th>
          <th>Penalty</th>
        </tr>
      </thead>
      <tbody>
        <For each={data}>
          {(item) => (
            <tr>
              <td>{item.under}</td>
              <td>{item.violation}</td>
              <td>{item.description}</td>
              <td>{item.penalty}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
