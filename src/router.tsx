import { createBrowserRouter, Outlet } from "react-router-dom";
import { SetupPage } from "../pages/SetupPage";
import { MatchPage } from "../pages/MatchPage";
import { HistoryPage } from "../pages/HistoryPage";
import { MatchProvider } from "../context/MatchContext";

import { NavBar } from "./components/navbar/NavBar";
export const router = createBrowserRouter([
  {
    element: (
      <MatchProvider>
        <NavBar />
        <Outlet />
      </MatchProvider>
    ),
    children: [
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
    ],
  },
]);
