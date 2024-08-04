import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./index.scss";
import styles from "./App.module.scss";

import { AuthProvider } from "./context/auth";
import { Protected } from "./components/protected";

import { Home } from "./components/home";
import { Login } from "./components/login";
import { Logout } from "./components/logout";
import { Page1 } from "./components/page1";

const root = document.getElementById("root") as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <div class={styles.App}>
      <header class={styles.header}>
        <Router>
          <AuthProvider>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route path="/" component={Protected}>
              <Route path="/" component={Home} />
              <Route path="/page1" component={Page1} />
            </Route>
          </AuthProvider>
        </Router>
      </header>
    </div>
  ),
  root
);
