import { useSuspenseQuery } from "@tanstack/react-query";
import { StyleGuide } from "@/shared/model/types";
import { getStyleGuidesAction } from "../styleguides/get-style-guides-action";
import { styleGuidesApi } from "./api";

type StyleGuidesResult = {
  guides: StyleGuide[];
  getActiveGuide: (codelang: string) => StyleGuide | undefined;
};

export const useStyleGuides = () => {
  const { data } = useSuspenseQuery<StyleGuide[], Error, StyleGuidesResult>({
    queryKey: [styleGuidesApi.baseKey],
    queryFn: getStyleGuidesAction,
    select: (guides: StyleGuide[]) => ({
      guides: guides ?? [],
      getActiveGuide: (codelang: string) => 
        guides?.find(guide => guide.codelang_code === codelang && guide.isActive)
    })
  });

  return data;
};