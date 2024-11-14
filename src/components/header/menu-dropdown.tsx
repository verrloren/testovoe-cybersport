"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GoGraph } from "react-icons/go";
import { Moon, Sun } from "lucide-react";
import { IoIosLogIn } from "react-icons/io";
import { useEffect, useRef } from "react";
import useMenuDropdown from "@/hooks/useMenuDropdown";
import { dropdownVariants, itemVariants } from "@/lib/motion-variants";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {  useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function MenuDropdown() {
  const { data: session } = useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuDropdown = useMenuDropdown();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      menuDropdown.onClose();
      menuDropdown.setClosedByOutsideClick(true);
    }
  };

  useEffect(() => {
    if (menuDropdown.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuDropdown.isOpen]);

  return (
    <AnimatePresence>
      {menuDropdown.isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={dropdownVariants}
          ref={dropdownRef}
          className="absolute top-[50%] right-0 w-44 h-auto pb-4 pt-10 z-10 bg-white/25 dark:bg-[#070707]/90 backdrop-blur-lg origin-top rounded-xl border flex justify-start items-center flex-col shadow-sm"
        >
          <motion.div className="w-full" variants={itemVariants}>
            <Button
              className="w-full bg-transparent text-textGrayDark dark:text-textGray  
							dark:hover:text-white hover:text-neutral-950 transition-colors hover:bg-transparent 
							shadow-none gap-x-2 justify-start ml-3 text-base"
              onClick={() => {
                router.push("/overview");
                menuDropdown.onClose();
              }}
            >
              <GoGraph size="14" className="text-neutral-800 dark:text-neutral-400" /> Overview
            </Button>
          </motion.div>

          <motion.div className="w-full" variants={itemVariants}>
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-full bg-transparent text-textGrayDark dark:text-textGray  
							dark:hover:text-white hover:text-neutral-950 transition-colors hover:bg-transparent 
							shadow-none gap-x-2 justify-start ml-3 text-base"
            >
              {theme === "light" ? (
                <Moon size="14" className="text-neutral-800 dark:text-neutral-400" />
              ) : (
                <Sun className="text-neutral-800 dark:text-neutral-400" size="14" />
              )}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </motion.div>

          <motion.div className="w-full" variants={itemVariants}>
              {session ? (
                <Button
                  className="w-full bg-transparent text-textGrayDark dark:text-textGray  
								dark:hover:text-white hover:text-neutral-900 transition-colors hover:bg-transparent 
								shadow-none gap-x-2 justify-start ml-3 text-base"
                  onClick={() => {
                    signOut().then(() => toast.success("Logged out"));
                    menuDropdown.onClose();
                  }}
                >
                  <IoIosLogIn className="text-neutral-800 dark:text-neutral-400" size="14" />
                  Log out
                </Button>
              ) : (
                <Button
                  className="w-full bg-transparent text-textGrayDark dark:text-textGray  
							dark:hover:text-white hover:text-neutral-900 transition-colors hover:bg-transparent 
							shadow-none gap-x-2 justify-start ml-3 text-base"
                  onClick={() => router.push("/auth/login")}
                >
                  <IoIosLogIn className="text-neutral-400" size="14" />
                  Login
                </Button>
              )}

          
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
