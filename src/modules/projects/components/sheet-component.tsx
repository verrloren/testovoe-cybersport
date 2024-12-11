
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineSetting } from "react-icons/ai";

import { StyleGuide } from "@/lib/types";

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
import { UploadStyleGuide } from "./upload-style-guide";
import toast from "react-hot-toast";
import { sendDefaultStyleGuide } from "@/modules/projects/sendDefaultStyleGuide"
import { Spin } from "antd";
import { useRouter } from "next/navigation";

interface SheetComponentProps {
  styleGuides: StyleGuide[];
}

export function SheetComponent({ styleGuides }: SheetComponentProps) {
  const [loading, setLoading] = useState(false);
	const router = useRouter();

	const getActiveStyleGuide = (guides: StyleGuide[], codelang: string) => {
		return guides.find(guide => guide.codelang_code === codelang && guide.isActive);
	};
	

	const handleSaveChanges = async () => {
		try {
			setLoading(true);
	
			// Get selected style guides IDs
			const selectedIds = Object.values(selectedStyleGuides)
				.filter((guide): guide is StyleGuide => guide !== null)
				.map(guide => guide.id);
	
			if (selectedIds.length === 0) {
				toast.error('Please select at least one style guide');
				return;
			}
	
			// Send each selected ID to backend
			for (const id of selectedIds) {
				const result = await sendDefaultStyleGuide(id);
				
				if (!result.success) {
					throw new Error(result.response);
				}
			}
	
			toast.success('Style guides updated successfully');
		} catch (error) {
			console.error('Failed to update style guides:', error);
			toast.error(error instanceof Error ? error.message : 'Failed to update style guides');
		} finally {
			setLoading(false);
			router.refresh();
		}
	};
	

  const [selectedStyleGuides, setSelectedStyleGuides] = useState<{
    [key: string]: StyleGuide | null;
  }>({
    typescript: null,
    python: null,
    sharp: null,
  });

  const handleStyleGuideSelect = (
    language: string,
    styleGuideId: string
  ) => {
    const selected = styleGuides.find((guide) => guide.id.toString() === styleGuideId);
    if (selected) {
      setSelectedStyleGuides((prev) => ({
        ...prev,
        [language]: selected,
      }));
    }
  };
	

  // Filter style guides for specific languages
  const styleGuidesByLanguage = {
    typescript: styleGuides.filter((guide) => guide.codelang_code === "typescript"),
    python: styleGuides.filter((guide) => guide.codelang_code === "python"),
    sharp: styleGuides.filter((guide) => guide.codelang_code === "sharp"),
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black rounded-full border
            border-neutral-800 hover:border-neutral-200 transition-colors peer"
        >
          <AiOutlineSetting className="text-white peer-hover:text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-full h-full bg-black backdrop-blur-lg border-l-neutral-800 rounded-bl-2xl rounded-tl-2xl
          flex flex-col justify-center overflow-hidden 
          px-4 sm:px-20 md:px-20 xl:px-28 2xl:px-36
          gap-y-12"
      >

				        {/* sphere */}
								<div
          className="radial-ellipse-dashboard w-full aspect-square
			fixed left-0 -bottom-[20%] md:-bottom-1/4 lg:-bottom-1/4 -z-50
			  xl:-bottom-1/4 "
        ></div>

        <SheetHeader>
          <SheetTitle
            className="text-white text-center text-7xl md:text-8xl lg:text-7xl 2xl:text-8xl font-poppins z-40 mb-4"
          >
            Choose your <br /> style guide
          </SheetTitle>
        </SheetHeader>

        <div className="w-full flex flex-col items-center gap-y-4">
          {(["typescript", "python", "sharp"] as const).map((language) => (
            <div
              className="w-full flex items-center justify-between gap-x-2"
              key={language}
            >
              <Select
                onValueChange={(value) => handleStyleGuideSelect(language, value)}
              >
                <SelectTrigger
                  className="w-full py-6 text-neutral-400 hover:text-neutral-400 
                    transition-colors bg-black rounded-2xl font-poppins text-sm 
                    font-light z-40 border border-neutral-800"
                >
              <SelectValue
                className="font-poppins"
                placeholder={
                  selectedStyleGuides[language]?.name || 
                  getActiveStyleGuide(styleGuides, language)?.name ||
                  `Select ${language} style guide`
                }
              />
                </SelectTrigger>

                <SelectContent className="w-full bg-black border border-neutral-800 rounded-2xl">
                  <SelectGroup className="w-full">
                    {styleGuidesByLanguage[language].map((guide) => (
                      <SelectItem
                        key={guide.id}
                        value={guide.id.toString()}
                        className="text-neutral-400 cursor-pointer hover:text-neutral-200 
                          transition-colors font-poppins text-sm font-light"
                      >
                        {guide.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <UploadStyleGuide
								codelang_code={language}
                styleGuideId={String(selectedStyleGuides[language]?.id)}
              />	
            </div>
          ))}
        </div>

        <SheetFooter className="w-full flex justify-center items-center">
					
          <SheetClose asChild>
            <Button
              className="py-6 w-full text-xl bg-white text-black font-poppins rounded-2xl z-40 transition-colors"
              type="submit"
           		 disabled={loading}
              onClick={handleSaveChanges}
            >
           	 {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
			<Spin spinning={loading} fullscreen />

    </Sheet>
  );
}
