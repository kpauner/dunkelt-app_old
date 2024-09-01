import { MainNavigation } from "../main-navigation";
import UserDropdown from "../user-dropdown";

export default function Header() {
  return (
    <header className="bg-black py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">City of Mist</div>
        <MainNavigation />
        <div className="w-32 ">
          <div className="w-full flex items-center justify-end">
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
