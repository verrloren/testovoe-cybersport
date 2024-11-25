"use client";

import { Logo } from "./logo";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/action/logout";
import { useRouter } from "next/navigation";

type LogoutData = {
	success: boolean;
	response: string;
}

export default function Header() {
  // const { data: session } = useSession();
  // const menuDropdown = useMenuDropdown();

	const router = useRouter();

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ height: "50%", opacity: 0 }}
      animate={{ height: 100, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-24 z-10 fixed top-0 left-0
			 bg-transparent flex items-center justify-center"
    >
      <nav className="w-full mx-12 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48 flex items-center justify-between ">
        <Logo />
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.8 }}
          className="flex items-center justify-center gap-x-8 xl:gap-12 2xl:gap-16"
          variants={linkVariants}
        >

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon size={20} className="text-neutral-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-3xl bg-black border-neutral-800">
              <DropdownMenuItem>
                <Button
                  className="w-full bg-black text-neutral-200 shadow-none"
                  onClick={ async () => {
                     await logout()
										 	.then((data: LogoutData) => {
												if (data.success) {
													console.log(data)
													toast.success(data.response)
													router.push("/auth/login");
												} else {
													toast.error(data.response)
												}
											})
                  }}
                >
									Sign out
								</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </nav>
    </motion.header>
  );
}
