import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Create } from "./create";
import { List } from "./list";
import { Print } from "./print";
import { Summary } from "./summary";
import { Update } from "./update";
import { UpdateAction } from "./update-action";
import { Upload } from "./upload";

export const Violation = () => (
  <Route path="/violation" component={ViolationWrapper}>
    <Route path="/" component={List} />
    <Route path="/create" component={Create} />
    <Route path="/upload" component={Upload} />
    <Route path="/print/:id" component={Print} />
    <Route path={["/summary", "/summary/:id"]} component={Summary} />
    <Route path="/updateAction/:id" component={UpdateAction} />
    <Route path="/:id" component={Update} />
  </Route>
);

export const ViolationWrapper: ParentComponent = (props) => (
  <div>
    <Title>Violation</Title>
    {props.children}
  </div>
);
