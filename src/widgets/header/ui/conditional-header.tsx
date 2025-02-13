'use client';

import { usePathname } from 'next/navigation';
import Header from '../../../components/header/header'; // Adjust the import path as needed

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideHeaderRoutes = ['/auth/login', '/auth/register'];

  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  return !shouldHideHeader ? <Header /> : null;
}