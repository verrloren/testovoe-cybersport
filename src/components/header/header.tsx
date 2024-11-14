'use client';

import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";

// import { useSession } from "next-auth/react";
// import { MenuNavbar } from "./menu-navbar";
import { motion } from 'framer-motion';
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function Header() {
  // const { data: session } = useSession();
  // const menuDropdown = useMenuDropdown();

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

	const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
		initial={{ height: '50%', opacity: 0 }}
		animate={{ height: 100, opacity: 1 }}
		transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-24 relative z-20
			 bg-black flex items-center justify-center shadow-xl
			 header-background"
    >
      <nav className="flex items-center justify-center gap-x-8">
			<motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2 }}
          variants={linkVariants}
        >
          <Link
            className={`font-lancelot text-2xl text-white hover:text-white transition-colors
              ${isActive('/tarot') ? "underline-gradient" : ""}`}
            href="/tarot"
          >
            Tarot
          </Link>
        </motion.div>
        <motion.div
									initial="hidden"
					animate="visible"
					transition={{ duration: 0.4, ease: "easeInOut", delay: 1 }}
					variants={linkVariants} 
					className={`relative  rounded-full w-14 h-14
					${isActive('/') && "radial-gradient-border" }`}
				>
          <Logo isActive={isActive('/')} />
        </motion.div>
				
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2	 }}
          variants={linkVariants}
        >
          <Link
            className={`font-lancelot text-2xl text-white hover:text-white transition-colors
              ${isActive('/astro') ? "underline-gradient" : ""}`}
            href="/astro"
          >
            Astro
          </Link>
        </motion.div>

      </nav>
			{/* <Button
        className="w-14 bg-white text-textGrayDark dark:text-textGray  
			dark:hover:text-white hover:text-neutral-900 transition-colors hover:bg-transparent 
			shadow-none gap-x-2 justify-start ml-3 text-base"
        onClick={() => {
          signOut().then(() => toast.success("Logged out"));
        }}
      >
        Log out
      </Button> */}
      {/* <div className="flex flex-row gap-x-3 items-center"> */}
      {/* <MenuNavbar /> */}
      {/* </div> */}
      {/* {menuDropdown.isOpen && <MenuDropdown />} */}
    </motion.header>
  );
}
