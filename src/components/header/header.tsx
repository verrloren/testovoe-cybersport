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
import { useLogout } from "@/modules/auth/use-logout";
// import { MainNav } from "./main-nav";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const { handleLogout } = useLogout();

  const onLogout = async () => {
    await handleLogout()
      .then(() => {
        document.cookie =
          "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        toast.success("You have been logged out.");
        router.push("/auth/login");
        router.refresh();
      })
      .catch((error) => toast.error("Logout failed: " + error));
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-24 z-10 absolute top-0 left-0
			 bg-transparent flex items-center justify-center"
    >
      <nav
        className="w-full 
			mx-12 sm:mx-16 md:mx-24 lg:mx-28 xl:mx-28 2xl:mx-48 
			flex items-center justify-between "
      >
        <Logo />

        {/* <MainNav /> */}

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <MenuIcon
              size={20}
              className={`transition-colors text-neutral-400 hover:text-white`}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mt-2 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-50 transition-colors shadow-lg ">

            <DropdownMenuItem className="hover:bg-black">
              <Button className="w-full bg-black shadow-none hover:text-white hover:bg-neutral-950">
                <Link
                  className="text-neutral-300  font-normal hover:text-white transition-colors"
                  href="/"
                >
                  Projects
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-black">
              <Button className="w-full bg-black shadow-none hover:text-white hover:bg-neutral-950">
                <Link
                  className="text-neutral-300 font-normal hover:text-white transition-colors"
                  href="/styleguides"
                >
                  Style Guides
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-black">
              <Button
                className="w-full bg-black text-neutral-300 font-normal shadow-none hover:text-white hover:bg-neutral-950"
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
