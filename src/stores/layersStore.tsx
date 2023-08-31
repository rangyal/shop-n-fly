import { ReactNode, createContext, useContext, useState } from "react";
import { CartoLayer as CartoLayerBase, MAP_TYPES } from "@deck.gl/carto/typed";

type Color = [number, number, number] | [number, number, number, number];
type ExtraProps = {
  cartoLabel: string;
  getLineColor: Color;
  getFillColor: Color;
} & Record<string, unknown>;

class CartoLayer extends CartoLayerBase<ExtraProps> {}

const useLayers = () => {
  const [layers, setLayers] = useState([
    new CartoLayer({
      id: "sociodemographics",
      cartoLabel: "Sociodemographics",
      type: MAP_TYPES.TILESET,
      connection: "carto_dw",
      data: "carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup",
      getLineColor: [128, 128, 128, 150],
      getFillColor: [128, 128, 128, 30],
      lineWidthMinPixels: 1,
    }),
    new CartoLayer({
      id: "airports",
      cartoLabel: "Airports",
      type: MAP_TYPES.TABLE,
      connection: "carto_dw",
      data: "carto-demo-data.demo_tables.world_airports",
      geoColumn: "geom",
      pointRadiusUnits: "pixels",
      pointRadiusMinPixels: 2,
      getPointRadius: 4,
      getLineColor: [255, 255, 255, 128],
      getFillColor: [238, 77, 90],
      lineWidthMinPixels: 1,
    }),
    new CartoLayer({
      id: "retailStores",
      cartoLabel: "Retail Stores",
      type: MAP_TYPES.TABLE,
      connection: "carto_dw",
      data: "carto-demo-data.demo_tables.retail_stores",
      geoColumn: "geom",
      pointRadiusUnits: "pixels",
      pointRadiusMinPixels: 2,
      getPointRadius: 4,
      getLineColor: [255, 255, 255, 128],
      getFillColor: [90, 77, 238],
      lineWidthMinPixels: 1,
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

  return { layers, updateLayerProps };
};

type UseLayersReturnType = ReturnType<typeof useLayers>;

const LayersStoreContext = createContext<UseLayersReturnType | null>(null);

export const LayersProvider = ({ children }: { children: ReactNode }) => {
  const value = useLayers();

  return (
    <LayersStoreContext.Provider value={value}>
      {children}
    </LayersStoreContext.Provider>
  );
};

export const useLayersContext = () => {
  const context = useContext(LayersStoreContext);

  if (!context) {
    throw new Error("useLayersContext must be used within a LayersProvider");
  }

  return context;
};

export type Layer = CartoLayer;