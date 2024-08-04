import { type Component, useContext } from "solid-js";
import Cookies from "universal-cookie";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";

import { User } from "../models/user";

import { AuthContext } from "../context/auth";
import { StatusCodes } from "http-status-codes";

const cookies = new Cookies(null, { path: "/" });

export const Login: Component = () => {
  const [fields, setFields] = createStore<Partial<User>>({});
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch(`${import.meta.env.VITE_API_SERVER}/user/login`, {
      body: JSON.stringify({
        password: fields.password,
        username: fields.username,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((res) => {
        if (res.status !== StatusCodes.OK) {
          throw res;
        }

        return res.json();
      })
      .then((res: User) => {
        cookies.set("user", res);
        auth.setUser(res);
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={submit}>
      <div>
        <span>Username: </span>
        <input onInput={(e) => setFields("username", e.target.value)} />
      </div>
      <div>
        <span>Password: </span>
        <input
          type="password"
          onInput={(e) => setFields("password", e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};
