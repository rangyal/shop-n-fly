import { useState } from "react";

type LayerDataLoadState = "loading" | "success" | "error";

const useLayerDataState = () => {
  const [dataLoadResultStates, setDataLoadResultStates] = useState<
    Record<string, LayerDataLoadState>
  >({});
  const layerDataLoadHandlerProps = (layerId: string) => ({
    onDataLoad: () => {
      setDataLoadResultStates((currentState) => ({
        ...currentState,
        [layerId]: "success",
      }));
    },
    onDataError: () => {
      setDataLoadResultStates((currentState) => ({
        ...currentState,
        [layerId]: "error",
      }));
    },
  });

  const getLayerDataLoadState = (layerId: string) => {
    return dataLoadResultStates[layerId] || "loading";
  };

  return {
    layerDataLoadHandlerProps,
    getLayerDataLoadState,
  };
};

export default useLayerDataState;
