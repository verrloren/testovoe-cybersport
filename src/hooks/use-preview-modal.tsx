import { create } from "zustand";


interface PrewiewModalStore {
	isOpen: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onOpen: (data: any) => void;
	onClose: () => void;
}

const usePreviewModal = create<PrewiewModalStore>((set) => ({
	isOpen: false,
	data:	undefined,
	onOpen: (data) => set({ data, isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default usePreviewModal;