"use client";

import Link from "next/link";
import { Logo } from "./logo";
// import { useSession } from "next-auth/react";
// import { MenuNavbar } from "./menu-navbar";
import { motion } from "framer-motion";
// import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  // const { data: session } = useSession();
  // const menuDropdown = useMenuDropdown();

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ height: "50%", opacity: 0 }}
      animate={{ height: 100, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-24 relative z-20
			 bg-white flex items-center justify-center border-b border-neutral-300"
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
          <Link
            className=" font-light text-xl text-neutral-800 hover:text-black transition-colors"
            href="/tarot"
          >
            Таро
          </Link>
          <Link
            className=" font-light text-xl text-neutral-800 hover:text-black transition-colors"
            href="/astro"
          >
            Астро
          </Link>
          <Link
            className=" font-light text-xl text-neutral-800 hover:text-black transition-colors"
            href="/history"
          >
            История
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon size={20} className="text-neutral-800" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-3xl bg-white">
              <DropdownMenuItem>
                <Button
                  className="w-full shadow-none"
                  onClick={() => {
                    signOut().then(() => toast.success("Logged out"));
                  }}
                >
									Выйти
								</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </nav>
    </motion.header>
  );
}
