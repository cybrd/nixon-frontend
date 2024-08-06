import { Route } from "@solidjs/router";

import { List } from "./list";

export const Violation = () => (
  <Route path="/violation">
    <Route path="/" component={List} />
  </Route>
);
