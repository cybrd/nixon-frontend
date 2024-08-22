import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { List } from "./list";

export const Handbook = () => (
  <Route path="/handbook" component={HandbookWrapper}>
    <Route path="/" component={List} />
  </Route>
);

export const HandbookWrapper: ParentComponent = (props) => (
  <div>
    <Title>Handbook</Title>
    {props.children}
  </div>
);
