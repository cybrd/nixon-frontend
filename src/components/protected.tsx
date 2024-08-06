import { ParentComponent, useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { AuthContext } from "../context/auth";
import { Menu } from "./menu";

export const Protected: ParentComponent = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const username = auth.user()?.username;

  if (!username) {
    console.log("to login");
    navigate("/login");
  }

  return (
    <div class="vh-100 d-flex flex-column overflow-hidden">
      <div class="flex-fill d-flex flex-row overflow-auto">
        <div class="d-flex flex-column">
          <Menu />
        </div>

        <div class="flex-fill p-3 overflow-auto">{props.children}</div>
      </div>
    </div>
  );
};
