import { StyleGuide, StyleGuideMap } from "@/lib/types";

export const getActiveGuides = (styleGuides: StyleGuide[]): StyleGuideMap => {
  return {
    typescript: styleGuides.find(guide => guide.codelang_code === "typescript" && guide.isActive) || null,
    python: styleGuides.find(guide => guide.codelang_code === "python" && guide.isActive) || null,
    sharp: styleGuides.find(guide => guide.codelang_code === "sharp" && guide.isActive) || null,
  };
};