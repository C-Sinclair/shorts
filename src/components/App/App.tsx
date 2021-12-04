import type { Component } from "solid-js";

import solidLogo from "../../assets/solid-logo.svg";
import styles from "./App.module.css";

export const App: Component = () => {
  return (
    <main class={styles.App}>
      <header>
        <h1 data-testid='page-title'>Shorts</h1>
      </header>

      <footer>
        <h4>Built with</h4>
        <img src={solidLogo} class={styles.logo} alt="logo" />
      </footer>
    </main>
  );
};

