import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ElementRef,
  FocusEventHandler,
  forwardRef,
  useEffect,
  useState,
} from "react";

import { TextField } from "@mui/material";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
} & Omit<
  ComponentPropsWithoutRef<typeof TextField>,
  "type" | "value" | "onChange" | "defaultValue" | "inputProps"
>;
const NumberInput = forwardRef<ElementRef<typeof TextField>, Props>(
  function NumberInput(
    { value, onChange, onBlur, step, min, max, ...textFieldProps },
    ref
  ) {
    const [internalValue, setInternalValue] = useState(value);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const newValue = Number(event.target.value);
      const hasMin = typeof min === "number" && !isNaN(min);
      const hasMax = typeof max === "number" && !isNaN(max);

      setInternalValue(newValue);

      if (hasMin && newValue < min) {
        return;
      }

      if (hasMax && newValue > max) {
        return;
      }

      onChange?.(newValue);
    };

    const handleInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setInternalValue(value);
      onBlur?.(event);
    };

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    return (
      <TextField
        {...textFieldProps}
        type="number"
        value={String(internalValue)}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        inputProps={{
          step,
          min,
          max,
        }}
        ref={ref}
      />
    );
  }
);

export default NumberInput;
