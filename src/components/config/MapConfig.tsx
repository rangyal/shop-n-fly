import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import LayerConfig from "@/components/config/LayerConfig";

import { useLayersContext } from "@/stores/layersStore";

const MapConfig = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const { layers } = useLayersContext();

  const handleChange =
    (key: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedKey(isExpanded ? key : null);
    };

  return (
    <>
      {layers.map((layer) => (
        <Accordion
          key={layer.id}
          expanded={layer.id === expandedKey}
          onChange={handleChange(layer.id)}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{layer.props.cartoLabel}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <LayerConfig layer={layer} />
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default MapConfig;
