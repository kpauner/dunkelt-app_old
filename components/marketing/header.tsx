import UserDropdown from "../user-dropdown";

export default function Header() {
  return (
    <header className="bg-black py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">City of Mist</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-pink-500">
                GET STARTED
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                SHOP
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                DOWNLOADS
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                LORE
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                MEDIA
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-500">
                COMMUNITY
              </a>
            </li>
          </ul>
        </nav>
        <div className="w-32 ">
          <div className="w-full flex items-center justify-end">
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
