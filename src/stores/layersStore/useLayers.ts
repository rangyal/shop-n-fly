import { useState } from "react";
import { CartoLayer as CartoLayerBase, MAP_TYPES } from "@deck.gl/carto/typed";

import useLayerDataState from "./useLayerDataState";

type Color = [number, number, number] | [number, number, number, number];
type ExtraProps = {
  geomType: "tiles" | "points";
  cartoLabel: string;
  getPointRadius: number;
  getLineColor: Color;
  getFillColor: Color;
} & Record<string, unknown>;

class CartoLayer extends CartoLayerBase<ExtraProps> {}

const useLayers = () => {
  const { layerDataLoadHandlerProps, getLayerDataLoadState } =
    useLayerDataState();
  const [layers, setLayers] = useState([
    new CartoLayer({
      id: "sociodemographics",
      cartoLabel: "Sociodemographics",
      geomType: "tiles",
      type: MAP_TYPES.TILESET,
      connection: "carto_dw",
      data: "carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup",
      getLineColor: [128, 128, 128, 150],
      getFillColor: [128, 128, 128, 30],
      lineWidthMinPixels: 1,
      ...layerDataLoadHandlerProps("sociodemographics"),
    }),
    new CartoLayer({
      id: "airports",
      cartoLabel: "Airports",
      geomType: "points",
      type: MAP_TYPES.TABLE,
      connection: "carto_dw",
      data: "carto-demo-data.demo_tables.world_airports",
      pointRadiusUnits: "pixels",
      getPointRadius: 4,
      getLineColor: [255, 255, 255, 128],
      getFillColor: [238, 77, 90],
      lineWidthMinPixels: 1,
      ...layerDataLoadHandlerProps("airports"),
    }),
    new CartoLayer({
      id: "retailStores",
      cartoLabel: "Retail Stores",
      geomType: "points",
      type: MAP_TYPES.TABLE,
      connection: "carto_dw",
      data: "carto-demo-data.demo_tables.retail_stores",
      pointRadiusUnits: "pixels",
      getPointRadius: 4,
      getLineColor: [255, 255, 255, 128],
      getFillColor: [90, 77, 238],
      lineWidthMinPixels: 1,
      ...layerDataLoadHandlerProps("retailStores"),
    }),
  ]);

  const updateLayerProps = (
    id: string,
    props: Partial<
      Pick<
        CartoLayer["props"],
        "getPointRadius" | "getLineColor" | "getFillColor"
      >
    >
  ) => {
    const newLayers = layers.map((layer) => {
      if (layer.id === id) {
        return new CartoLayer({ ...layer.props, ...props });
      }

      return layer;
    });
    setLayers(newLayers);
  };

  return { layers, getLayerDataLoadState, updateLayerProps };
};

export default useLayers;
export type Layer = CartoLayer;
