import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from "react";

import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

import NumberInput from "@components/base/NumberInput";

type Props = Omit<
  ComponentPropsWithoutRef<typeof Slider>,
  "value" | "onChange" | "defaultValue" | "step"
> & {
  label?: string;
  value: number;
  onChange?: (value: number) => void;
  step?: number;
};

const SliderInput = forwardRef<ElementRef<typeof Slider>, Props>(
  function SliderInput(
    { min = 0, max = 100, step = 1, label, value, onChange, ...sliderProps },
    ref
  ) {
    const labelId = ((id) => label && id)(useId());

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
      onChange?.(newValue as number);
    };

    return (
      <div>
        {label && (
          <Typography id={labelId} gutterBottom>
            {label}
          </Typography>
        )}

        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              {...sliderProps}
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleSliderChange}
              aria-labelledby={labelId}
              ref={ref}
            />
          </Grid>
          <Grid item>
            <NumberInput
              value={value}
              size="small"
              onChange={onChange}
              step={step}
              min={min}
              max={max}
              aria-labelledby={labelId}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
);

export default SliderInput;
