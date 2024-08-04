import { useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { AuthContext } from "../context/auth";

export const Logout = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  auth.setUser({});
  navigate("/login");

  return <div></div>;
};
