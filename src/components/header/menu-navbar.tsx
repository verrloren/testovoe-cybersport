'use client'
import { BsThreeDots } from "react-icons/bs";
import useMenuDropdown from "@/hooks/useMenuDropdown";




export function MenuNavbar() {

  const menuDropdown = useMenuDropdown();

  const toggleMenu = () => {
    if (menuDropdown.isOpen) {
      menuDropdown.onClose();
    } else {
      if (!menuDropdown.closedByOutsideClick) {
        menuDropdown.onOpen();
      }
      menuDropdown.setClosedByOutsideClick(false);
    }
  };

  return (
    <div className="w-6 h-6 bg-none rounded-full flex justify-center items-center origin-top">
      <BsThreeDots
        className={`cursor-pointer w-6 h-6 text-textGray hover:text-neutral-800 dark:hover:text-white transition-all ${menuDropdown.isOpen ? 'rotate-90' : ''}`}
        onClick={toggleMenu}
      />
			
    </div>
  );
}