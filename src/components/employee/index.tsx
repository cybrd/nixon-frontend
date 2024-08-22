import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { List } from "./list";

export const Employee = () => (
  <Route path="/employee" component={EmployeeWrapper}>
    <Route path="/" component={List} />
  </Route>
);

export const EmployeeWrapper: ParentComponent = (props) => (
  <div>
    <Title>Employee</Title>
    {props.children}
  </div>
);
