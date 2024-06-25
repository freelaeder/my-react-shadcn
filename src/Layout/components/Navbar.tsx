import MenuContainer from "./Menu";
import { ModeToggle } from "@/components/custom/modeToggle";

export default function Navbar() {
  return (
    <div className=" w-full fixed top-0 z-50 flex justify-between items-center bg-background px-4">
      <MenuContainer />
      <ModeToggle />
    </div>
  );
}
