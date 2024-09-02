import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Create } from "./create";
import { List } from "./list";
import { Update } from "./update";

export const Employee = () => (
  <Route path="/employee" component={EmployeeWrapper}>
    <Route path="/" component={List} />
    <Route path="/create" component={Create} />
    <Route path="/:id" component={Update} />
  </Route>
);

export const EmployeeWrapper: ParentComponent = (props) => (
  <div>
    <Title>Employee</Title>
    {props.children}
  </div>
);
