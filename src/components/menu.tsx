import { A } from "@solidjs/router";
import { type Component } from "solid-js";

export const Menu: Component = () => (
  <div class="text-nowrap">
    <div>
      <A href="/">Home</A>
    </div>
    <div>
      <A href="/employee">Employee List</A>
    </div>
    <div>
      <A href="/handbook">Handbook</A>
    </div>
    <div>
      <A href="/violation">Violation</A>
    </div>
    <div>
      <A href="/violation/create">Violation Create</A>
    </div>
    <div>
      <A href="/logout">Logout</A>
    </div>
  </div>
);
