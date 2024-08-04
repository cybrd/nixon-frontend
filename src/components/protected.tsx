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
    <div>
      <Menu />
      <div>{props.children}</div>
    </div>
  );
};
