import { createBrowserRouter } from "react-router-dom";
import { SetupPage } from "../pages/SetupPage";
import { MatchPage } from "../pages/MatchPage";
import { HistoryPage } from "../pages/HistoryPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <SetupPage />,
  },
  {
    path: "/match",
    element: <MatchPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);
