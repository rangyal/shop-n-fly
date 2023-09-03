import ColorInput, { Color } from "@/components/base/ColorInput";
import SliderInput from "@/components/base/SliderInput";

import { Layer, useLayersContext } from "@/stores/layersStore";

interface Props {
  layer: Layer;
}

const LayerConfig = ({ layer }: Props) => {
  const { updateLayerProps } = useLayersContext();

  const handleFillColorChange = (color: Color) =>
    updateLayerProps(layer.id, {
      getFillColor: color,
    });

  const handleOutlineColorChange = (color: Color) =>
    updateLayerProps(layer.id, {
      getLineColor: color,
    });

  const handleRadiusChange = (radius: number) =>
    updateLayerProps(layer.id, {
      getPointRadius: radius,
    });

  return (
    <>
      <ColorInput
        label="Fill color"
        value={layer.props.getFillColor}
        onChange={handleFillColorChange}
        style={{ width: "100%" }}
      />
      <ColorInput
        label="Outline color"
        value={layer.props.getLineColor}
        onChange={handleOutlineColorChange}
        sx={{ width: "100%" }}
      />
      {layer.props.geomType === "points" && (
        <SliderInput
          label="Radius"
          value={layer.props.getPointRadius}
          onChange={handleRadiusChange}
          min={0}
          max={100}
        />
      )}
    </>
  );
};

export default LayerConfig;
