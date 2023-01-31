import React from "react";
import ReactDOM from "react-dom/client";
import { defineConfig, Studio } from "sanity";
import { deskTool } from "sanity/desk";
import type { SchemaTypeDefinition } from "sanity";

const useRemoteSchema = (url: string) => {
  const [schema, setSchema] = React.useState<SchemaTypeDefinition>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setSchema(json))
      .then(() => setLoading(false));
  }, [url]);

  return { loading, schema };
};

const App = () => {
  const { loading, schema } = useRemoteSchema(
    "https://gist.githubusercontent.com/runeb/e0b20e54927d20a2fca6912b646bc61d/raw/392ba8241e009cad4321346fb6c176147257b73c/article.json"
  );

  // What you normally put in a sanity.config.ts/js file!
  const studioConfig = defineConfig({
    projectId: "rwmuledy",
    dataset: "production",
    plugins: [deskTool()],
    schema: {
      types: [schema]
    },
  });

  if (loading) {
    return <small>Loading…</small>;
  }
  return <Studio config={studioConfig} />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
