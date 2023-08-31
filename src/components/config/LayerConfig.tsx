import ColorInput from "@/components/config/ColorInput";

import { Layer, useLayersContext } from "@/stores/layersStore";

interface Props {
  layer: Layer;
}

const LayerConfig = ({ layer }: Props) => {
  const { updateLayerProps } = useLayersContext();

  return (
    <>
      <ColorInput
        label="Fill color"
        value={layer.props.getFillColor}
        onChange={(color) =>
          updateLayerProps(layer.id, {
            getFillColor: color,
          })
        }
        style={{ width: "100%" }}
      />
      <ColorInput
        label="Outline color"
        value={layer.props.getLineColor}
        onChange={(color) =>
          updateLayerProps(layer.id, {
            getLineColor: color,
          })
        }
        sx={{ width: "100%" }}
      />
    </>
  );
};

export default LayerConfig;
