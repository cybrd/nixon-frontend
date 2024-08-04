import { A } from "@solidjs/router";
import { type Component } from "solid-js";

export const Menu: Component = () => (
  <div>
    <div>
      <A href="/">Home</A>
    </div>
    <div>
      <A href="/page1">Page1</A>
    </div>
    <div>
      <A href="/logout">Logout</A>
    </div>
  </div>
);
