import type { Component } from "solid-js";

import styles from "./App.module.css";

const App: Component = () => {
  const submit = (event: Event) => {
    console.log("Done");
    event.preventDefault();
    event.stopPropagation;
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <form onSubmit={submit}>
          <div>
            <span>Username: </span>
            <input name="username" />
          </div>
          <div>
            <span>Password: </span>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default App;
