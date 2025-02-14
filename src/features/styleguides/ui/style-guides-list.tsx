"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
	ClientLoader,
	container,
	item,
} from "@/shared";
import { StyleGuide } from "@/entities/styleguide";
import { styleGuidesApi, DeleteStyleGuideDialog, EditStyleGuideSheet, getStyleGuidesAction } from "@/features/styleguides";




export function StyleGuidesList() {

  const { data: styleguides = [], isLoading } = useQuery<StyleGuide[]>({
    queryKey: [styleGuidesApi.baseKey],
    queryFn: getStyleGuidesAction,
  });

	if (isLoading) return (
		<div className="w-full h-full flex justify-center items-center">
			<ClientLoader />
		</div>
	)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4"
    >
      {styleguides.map((styleguide) => (
        <motion.div
					variants={item}
          key={styleguide.id}
          className={`relative bg-neutral-950 border border-neutral-900 rounded-2xl 
				hover:border-neutral-600 transition-colors px-8 py-8 `}
        >
          {/* STYLEGUIDE NAME */}
          <div className="flex flex-row items-center gap-x-2">
            <Link
              href={`/styleguides/${styleguide.id}`}
              className="text-white text-2xl"
            >
              {styleguide.name}
            </Link>
            <div className="w-2 h-2 mt-1 rounded-full"></div>
          </div>


					{/* DROPDOWN */}
          <div className="absolute top-6 right-4 ">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <DotsVerticalIcon
                  width={18}
                  height={18}
                  className="text-neutral-400 hover:text-white transition-colors"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-neutral-950 w-full border border-neutral-800  rounded-xl">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EditStyleGuideSheet
                    styleGuideId={styleguide.id}
										styleGuideGuidelineId={styleguide.guideline_id}
                    styleGuideName={styleguide.name}
                    bg="dark"
                    border="none"
                    wfull="wfull"
                    text="Edit"
                    rounded="md"
                  />
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DeleteStyleGuideDialog
                    styleguideId={styleguide.id}
                    bg="dark"
                    border="none"
                    wfull="wfull"
                    text="Delete"
                    rounded="md"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
