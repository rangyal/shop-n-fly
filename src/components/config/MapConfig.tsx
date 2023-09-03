import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CircularProgressIcon from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import LayerConfig from "@/components/config/LayerConfig";

import { useLayersContext } from "@/stores/layersStore";

const MapConfig = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const { layers, getLayerDataLoadState } = useLayersContext();

  return (
    <>
      {layers.map((layer) => {
        const layerDataLoadState = getLayerDataLoadState(layer.id);
        let expandIcon;

        switch (layerDataLoadState) {
          case "loading":
            expandIcon = <CircularProgressIcon size="1em" />;
            break;
          case "error":
            expandIcon = (
              <Tooltip title="Failed to load layer data">
                <ErrorOutlineIcon color="error" />
              </Tooltip>
            );
            break;
          default:
            expandIcon = <ExpandMoreIcon />;
            break;
        }

        const handleChange = (
          event: React.SyntheticEvent,
          isExpanded: boolean
        ) => {
          if (layerDataLoadState !== "success") {
            return;
          }

          setExpandedKey(isExpanded ? layer.id : null);
        };

        return (
          <Accordion
            key={layer.id}
            expanded={layer.id === expandedKey}
            onChange={handleChange}
            disableGutters
          >
            <AccordionSummary expandIcon={expandIcon}>
              <Typography>{layer.props.cartoLabel}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <LayerConfig layer={layer} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default MapConfig;
