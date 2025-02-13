'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logout } from '@/modules/auth/logout';
import { toast } from 'react-hot-toast';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      queryClient.clear();
      const result = await logout();
      if (result.success) {
        queryClient.removeQueries({ queryKey: ['projects'] });
        queryClient.removeQueries({ queryKey: ['styleguides'] });
        router.push('/auth/login');
        router.refresh();
      } else {
        toast.error(result.response);
      }
    } catch (error) {
      toast.error('Logout failed: ' + error);
    }
  };

  return { handleLogout };
};