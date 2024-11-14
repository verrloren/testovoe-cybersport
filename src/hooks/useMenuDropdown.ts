import { create } from 'zustand';

interface MenuDropdownStore {
  isOpen: boolean;
  closedByOutsideClick: boolean;
  onOpen: () => void;
  onClose: () => void;
  setClosedByOutsideClick: (value: boolean) => void;
}

const useMenuDropdown = create<MenuDropdownStore>((set) => ({
  isOpen: false,
  closedByOutsideClick: false,
  onOpen: () => set({ isOpen: true, closedByOutsideClick: false }),
  onClose: () => set({ isOpen: false }),
  setClosedByOutsideClick: (value: boolean) => set({ closedByOutsideClick: value }),
}));

export default useMenuDropdown;