import { useStore } from '@/store/store';

export const useUserId = () => {
  return useStore((state) => state.userId);
};