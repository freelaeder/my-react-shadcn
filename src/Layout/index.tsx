import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
