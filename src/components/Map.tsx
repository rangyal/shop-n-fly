import StaticMap from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { BASEMAP } from "@deck.gl/carto/typed";
import { setDefaultCredentials } from "@deck.gl/carto/typed";

import useMediaQuery from "@mui/material/useMediaQuery";

import "mapbox-gl/dist/mapbox-gl.css";

import { useLayersContext } from "@/stores/layersStore";

// Focusing on USA because Sociodemographics data is USA only
const INITIAL_VIEWSTATE = {
  longitude: -110.37672316136673,
  latitude: 51.48069573057817,
  zoom: 2.283251379504558,
};

setDefaultCredentials({
  apiBaseUrl: "https://gcp-europe-west1.api.carto.com",
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNm8xbm83cm4iLCJqdGkiOiJlMmNkY2U5ZCJ9.giTWmLagACIzflX633XLY3jNtR3YLZ0FeOKpF0ljmuw",
});

const Map = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { layers } = useLayersContext();

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEWSTATE}
      controller={true}
    >
      <StaticMap
        mapStyle={prefersDarkMode ? BASEMAP.DARK_MATTER : BASEMAP.POSITRON}
      />
    </DeckGL>
  );
};

export default Map;
