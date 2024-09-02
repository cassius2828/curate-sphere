import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async "db:seed"() {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          };
          const data = await fetch(`http://localhost:3000/test`, options);
          return data;
        },
      });
    },
  },
});
