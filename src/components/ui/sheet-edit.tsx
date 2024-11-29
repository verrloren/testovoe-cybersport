"use client";

import { Button } from "@/components/ui/button";
import { languagesStyleGuides } from "@/lib/data";
import { AiOutlineEdit } from "react-icons/ai";


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SheetEdit() {
  return (
    <Sheet>
      <SheetTrigger asChild>
			<Button
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-600 hover:border-neutral-200 transition-colors peer"
			>	
				<AiOutlineEdit size={16} className="text-white peer-hover:text-white" />
			</Button>
      </SheetTrigger>

      <SheetContent
        className="w-full bg-black/80 xl:px-16 backdrop-blur-lg border-l-neutral-800 rounded-xl 
								flex flex-col  items-center overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle className="text-radial-gradient-style-guide py-2 text-center text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl mt-4 2xl:mt-12 font-poppins">
            Choose your <br /> <span className="">style guide</span>
          </SheetTitle>
        </SheetHeader>
        <div className="w-full mt-4 2xl:mt-8 grid grid-cols-2 2xl:grid-cols-3 gap-y-4 gap-x-8">
          {languagesStyleGuides.map((language) => (
            <div
              className="flex items-center justify-between gap-x-2"
              key={language.id}
            >
              {/* <h3 className="font-poppins text-md text-neutral-200">
													{language.name}
												</h3> */}
              <Select>
                <SelectTrigger className="w-full text-neutral-400 hover:text-neutral-400 transition-colors bg-black rounded-xl font-poppins text-sm">
                  <SelectValue
                    className="font-poppins"
                    placeholder={language.styleGuide}
                  />
                </SelectTrigger>
                <SelectContent className="bg-black border border-neutral-800 rounded-xl">
                  <SelectGroup>
                    {language.styleGuide.map((styleGuide) => (
                      <SelectItem
                        key={language.id}
                        className="text-neutral-400 cursor-pointer hover:text-neutral-200 transition-colors font-poppins text-sm"
                        value={language.id}
                      >
                        {styleGuide}
                      </SelectItem>
                    ))}
                    <SelectItem
                      className="text-neutral-400 cursor-pointer hover:text-neutral-200 transition-colors font-poppins text-sm"
                      value="uploadNew"
                    >
                      + Upload new
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-8 w-full flex justify-center items-center">
          <SheetClose asChild>
            <Button
              className="py-6 w-full text-xl bg-white text-black font-poppins rounded-xl"
              type="submit"
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
