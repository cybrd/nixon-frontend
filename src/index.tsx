import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "bootstrap/scss/bootstrap.scss";

import { AuthProvider } from "./context/auth";
import { Protected } from "./components/protected";

import { Employee } from "./components/employee";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { Logout } from "./components/logout";

const root = document.getElementById("root") as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <div class="App">
      <header class="header">
        <Router>
          <AuthProvider>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route path="/" component={Protected}>
              <Route path="/" component={Home} />
              <Employee />
            </Route>
          </AuthProvider>
        </Router>
      </header>
    </div>
  ),
  root
);
