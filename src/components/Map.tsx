import { useCallback, useRef, useState } from "react";
import StaticMap from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { BASEMAP } from "@deck.gl/carto/typed";
import { setDefaultCredentials } from "@deck.gl/carto/typed";

import Box from "@mui/material/Box";

import useMediaQuery from "@mui/material/useMediaQuery";

import "mapbox-gl/dist/mapbox-gl.css";

import useResizeObserver from "@/utils/useResizeObserver";
import { useLayersContext } from "@/stores/layersStore";

// Focusing on USA because Sociodemographics data is USA only
const INITIAL_VIEWSTATE = {
  longitude: -110,
  latitude: 51,
  zoom: 2,
};

setDefaultCredentials({
  apiBaseUrl: "https://gcp-europe-west1.api.carto.com",
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNm8xbm83cm4iLCJqdGkiOiJlMmNkY2U5ZCJ9.giTWmLagACIzflX633XLY3jNtR3YLZ0FeOKpF0ljmuw",
});

const Map = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEWSTATE);
  const { layers } = useLayersContext();

  // Fix issue with DeckGL not updating width on resize
  // Might be related to https://github.com/visgl/deck.gl/issues/6206
  const updateViewRect = useCallback(
    (rect: DOMRectReadOnly) => {
      setViewState((currentViewState) => ({
        ...currentViewState,
        width: rect.width,
      }));
    },
    [setViewState]
  );
  useResizeObserver(containerRef, updateViewRect);

  const handleViewStateChange = (viewState: any) => {
    setViewState(viewState.viewState);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
      ref={containerRef}
    >
      <DeckGL
        layers={layers}
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller={true}
      >
        <StaticMap
          mapStyle={prefersDarkMode ? BASEMAP.DARK_MATTER : BASEMAP.POSITRON}
        />
      </DeckGL>
    </Box>
  );
};

export default Map;
