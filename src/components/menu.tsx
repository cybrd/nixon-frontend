import { type Component, useContext } from "solid-js";
import { A } from "@solidjs/router";
import { AuthContext } from "../context/auth";

export const Menu: Component = () => {
  const auth = useContext(AuthContext);

  return (
    <div class="text-nowrap p-2 d-print-none">
      <div>
        <A href="/">Home</A>
      </div>
      <div>
        <A href="/employee">Employee List</A>
      </div>
      <div>
        <A href="/employee/create">Employee Create</A>
      </div>
      <div>
        <A href="/handbook">Handbook</A>
      </div>
      <div>
        <A href="/violation">Violation List</A>
      </div>
      <div>
        <A href="/violation/summary">Violation Summary</A>
      </div>
      <div>
        <A href="/violation/create">Violation Create</A>
      </div>
      {auth.user().role === "admin" && (
        <div>
          <A href="/violation/upload">Violation Upload File</A>
        </div>
      )}
      <div>
        <A href="/logout">Logout</A>
      </div>
    </div>
  );
};
