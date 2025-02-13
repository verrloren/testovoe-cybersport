

import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface AuthStoreState {
	userId: number | null;
	setUserId: (id:number) => void;
	clearUserId: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
	persist(
		(set) => ({
			userId: null,
			setUserId: (id) => set({ userId: id }),
			clearUserId: () => set({ userId: null }),
		}),
		{
			name: 'auth-storage',
		}
	)
)