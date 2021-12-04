import type { Component } from "solid-js";
import { Footer } from "../Footer/Footer";

import styles from "./App.module.css";

export const App: Component = () => {
  return (
    <main class={styles.App}>
      <header>
        <h1 data-testid='page-title'>Shorts</h1>
      </header>

      <Footer />
    </main>
  );
};

