import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
export function NavigationMenuDemo() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
