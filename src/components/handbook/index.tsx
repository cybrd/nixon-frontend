import { Route } from "@solidjs/router";

import { List } from "./list";

export const Handbook = () => (
  <Route path="/handbook">
    <Route path="/" component={List} />
  </Route>
);
