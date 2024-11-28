"use client";

import { Logo } from "./logo";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";


type LogoutData = {
  success: boolean;
  response: string;
};

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    const data: LogoutData = await response.json();
    return data;
  };

  const onLogout = async () => {
    const data = await handleLogout();
    if (data.success) {
      toast.success(data.response);
      router.push("/auth/login");
    } else {
      toast.error(data.response);
    }
  };


  return (
    <motion.header
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-24 z-10 absolute top-0 left-0
			 bg-transparent flex items-center justify-center"
    >
      <nav className="w-full mx-12 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48 flex items-center justify-between ">
        <Logo />

			     <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <MenuIcon size={20} className="text-neutral-400" />
            </DropdownMenuTrigger>

            <DropdownMenuContent 
						className="rounded-2xl bg-black border-neutral-600">
              <DropdownMenuItem>
                <Button
                  className="w-full bg-black text-neutral-200 shadow-none"
									onClick={onLogout}
                >
									Sign out
								</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


      </nav>
    </motion.header>
  );
}
