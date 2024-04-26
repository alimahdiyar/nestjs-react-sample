import React from "react";
import Router from "./router";
import { ProductsProvider } from "./context/ProductsContext";

function App() {
  return (
    <React.Suspense>
      <ProductsProvider>
        <main>
          <Router />
        </main>
      </ProductsProvider>
    </React.Suspense>
  );
}

export default App;
