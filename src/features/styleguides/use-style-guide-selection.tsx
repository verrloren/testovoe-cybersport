import { StyleGuide, StyleGuideLanguage, StyleGuideMap } from "@/shared/model/types";
import { useState } from "react";

export const useStyleGuideSelection = () => {
  const [selectedGuides, setSelectedGuides] = useState<StyleGuideMap>({
    typescript: null,
    python: null,
    sharp: null
  });

  const selectGuide = (language: StyleGuideLanguage, guide: StyleGuide | null) => {
    setSelectedGuides(prev => ({ ...prev, [language]: guide }));
  };

  const getSelectedIds = () => 
    Object.values(selectedGuides)
      .filter((guide): guide is StyleGuide => guide !== null)
      .map(guide => guide.id);

  return {
    selectedGuides,
    selectGuide,
    getSelectedIds
  };
};