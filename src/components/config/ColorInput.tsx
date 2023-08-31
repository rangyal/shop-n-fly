import { ElementRef, forwardRef } from "react";
import parseColor from "parse-color";

import { MuiColorInput, MuiColorInputProps } from "mui-color-input";

type Color = [number, number, number] | [number, number, number, number];

type Props = Omit<MuiColorInputProps, "value" | "onChange"> & {
  value: Color;
  onChange: (value: Color) => void;
};

const ColorInput = forwardRef<ElementRef<typeof MuiColorInput>, Props>(
  function ColorInput({ value, onChange, ...props }, ref) {
    const [r, g, b, a = 255] = value;
    const inputValue = { r, g, b, a: a / 255 };

    const handleChange: MuiColorInputProps["onChange"] = (colorStr) => {
      const [r, g, b, a] = parseColor(colorStr).rgba;

      onChange([r, g, b, Math.round(a * 255)]);
    };

    return (
      <MuiColorInput
        {...props}
        value={inputValue}
        onChange={handleChange}
        ref={ref}
      />
    );
  }
);

export default ColorInput;
