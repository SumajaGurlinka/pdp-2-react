import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import Settings1 from "./pages/Settings1";

import CS1 from "./pages/CS1";
import PE1 from "./pages/PE1";
import DME1 from "./pages/DME1";
import DE1 from "./pages/DE1";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />

      <Route path="/dashboard" Component={CS1} />

      <Route path="/cs" Component={CS1} />
      <Route path="/dme" Component={DME1} />
      <Route path="/de" Component={DE1} />
      <Route path="/pe" Component={PE1} />

      <Route path="/settings" Component={Settings1} />
    </Routes>
  );
};

export default AppRoutes;
