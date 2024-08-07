import { Route } from "@solidjs/router";

import { Create } from "./create";
import { List } from "./list";

export const Violation = () => (
  <Route path="/violation">
    <Route path="/" component={List} />
    <Route path="/create" component={Create} />
  </Route>
);
