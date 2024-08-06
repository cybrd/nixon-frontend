import { Route } from "@solidjs/router";

import { List } from "./list";

export const Employee = () => (
  <Route path="/employee">
    <Route path="/" component={List} />
  </Route>
);
