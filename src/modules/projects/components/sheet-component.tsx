"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineSetting } from "react-icons/ai";

import { StyleGuide, StyleGuideMap } from "@/lib/types";

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
import { Spin } from "antd";
// import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { styleGuidesApi } from "../api";
import { getStyleGuidesAction } from "../get-style-guides-action";
import { useStyleGuideMutation } from "../use-save-style-guides";
import { LoadingOutlined } from '@ant-design/icons';

export function SheetComponent() {
  const [selectedGuides, setSelectedGuides] = useState<StyleGuideMap>({
    typescript: null,
    python: null,
    sharp: null,
  });

  // const router = useRouter();

  const { saveGuides, loading } = useStyleGuideMutation();
  const { data: styleGuides = [] } = useQuery({
    queryKey: [styleGuidesApi.baseKey],
    queryFn: getStyleGuidesAction,
  });

  const getActiveStyleGuide = (guides: StyleGuide[], codelang: string) => {
    return guides.find(
      (guide) => guide.codelang_code === codelang && guide.isActive
    );
  };

  const handleSaveChanges = async () => {
    try {
      const success = await saveGuides(selectedGuides);
      if (success) {
        toast.success("Style guides saved successfully");
        document.getElementById("sheet-close-button")?.click();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update style guides"
      );
    }
  };

  const handleStyleGuideSelect = (language: string, styleGuideId: number) => {
    const selected = styleGuides.find(
      (guide) => guide.id === styleGuideId
    );
    if (selected) {
      setSelectedGuides((prev) => ({
        ...prev,
        [language]: selected,
      }));
    }
  };

  // Filter style guides for specific languages
  const styleGuidesByLanguage = {
    typescript: styleGuides.filter(
      (guide) => guide.codelang_code === "typescript"
    ),
    python: styleGuides.filter((guide) => guide.codelang_code === "python"),
    sharp: styleGuides.filter((guide) => guide.codelang_code === "sharp"),
  };

	console.log(styleGuides)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black/90 hover:bg-black/90 rounded-full border border-black/90 
					hover:border-white shadow-none transition-colors"
        >
          <AiOutlineSetting className="text-white " />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-full sm:w-full md:w-[100vw] h-screen bg-black backdrop-blur-lg border-l-neutral-800 rounded-bl-2xl rounded-tl-2xl
          flex flex-col justify-center overflow-hidden
          px-4 sm:px-20 md:px-20 xl:px-28 2xl:px-36
          gap-y-12"
      >
        {/* sphere */}
        <div
          className="radial-ellipse-dashboard w-full aspect-square
			absolute left-0 -bottom-[20%] md:-bottom-1/4 lg:-bottom-1/4 -z-50
			  xl:-bottom-1/4 "
        ></div>

        <SheetHeader>
          <SheetTitle className="text-white text-center text-7xl md:text-8xl lg:text-7xl 2xl:text-8xl font-poppins z-40 mb-4">
            Choose your <br /> style guide
          </SheetTitle>
        </SheetHeader>

        <div className="w-full flex flex-col items-center gap-y-4 z-10">
          {(["typescript", "python", "sharp"] as const).map((language) => (
            <div
              className="w-full flex items-center justify-between gap-x-2"
              key={language}
            >
              <Select
                onValueChange={(value) =>
                  handleStyleGuideSelect(language, Number(value))
                }
              >
                <SelectTrigger
                  className="w-full py-6 text-neutral-400 hover:text-neutral-400 
                    transition-colors bg-black rounded-2xl font-poppins text-sm 
                    font-light z-40 border border-neutral-800"
                >
                  <SelectValue
                    className="font-poppins"
                    placeholder={
                      selectedGuides[language]?.name ||
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
                styleGuideId={selectedGuides[language]?.id}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="w-full flex justify-center items-center">
          <SheetClose id="sheet-close-button" asChild>
            <Button
              className="py-6 w-full text-xl bg-white text-black font-poppins rounded-2xl z-40 transition-colors"
              type="submit"
              disabled={loading}
              onClick={handleSaveChanges}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spin fullscreen />
                </div>
              ) : (
                "Save changes"
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      <Spin indicator={<LoadingOutlined spin />} size="large" spinning={loading} fullscreen />
    </Sheet>
  );
}
