import { Route } from "@solidjs/router";

import { Create } from "./create";
import { List } from "./list";
import { Update } from "./update";
import { Upload } from "./upload";

export const Violation = () => (
  <Route path="/violation">
    <Route path="/" component={List} />
    <Route path="/create" component={Create} />
    <Route path="/upload" component={Upload} />
    <Route path="/:id" component={Update} />
  </Route>
);
