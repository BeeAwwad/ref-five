import { RouterProvider } from "react-router-dom";
import { router } from "./router";
function App() {
  return (
    <>
      <h1>Ref 5</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
