import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";
import GlobalStyles from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
