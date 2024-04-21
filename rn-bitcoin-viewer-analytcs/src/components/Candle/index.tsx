import React from "react";
import { ScaleLinear } from "d3-scale";
import { Line, Rect } from "react-native-svg";
import { ICandle } from "@/models/CandleModel";
import { useCandleIndividual } from "./index.hook";

interface CandleProps {
  candle: ICandle;
  index: number;
  width: number;
  scaleY: ScaleLinear<number, number>;
  scaleBody: ScaleLinear<number, number>;
}

export const CandleIndividual = ({ candle, index, width, scaleY, scaleBody }: CandleProps) => {
  const { close, open, high, low, color } = candle;

  const {
    onReturnHighOrLow,
    onReturnAxisXYLineComponent,
    onReturnAxisAndSizeRectComponent,
    onReturnMaxAndMin
  } = useCandleIndividual();

  const { xAxis } = onReturnAxisXYLineComponent({ width, index })
  const { highOrLow } = onReturnHighOrLow({ open, close })
  const { xAxisRect, widthRect } = onReturnAxisAndSizeRectComponent({ width, index })
  const { maxValue, minValue } = onReturnMaxAndMin({ open, close })



  return (
    <>
      {
        color !== 'undetermined' &&
        <>
          <Line
            x1={xAxis}
            x2={xAxis}
            y1={scaleY(low)}
            y2={scaleY(high)}
            stroke={highOrLow}
            strokeWidth={1}
          />
          <Rect
            x={xAxisRect}
            y={scaleY(maxValue)}
            width={widthRect}
            height={scaleBody(maxValue - minValue)}
            {...{ fill: highOrLow }}
          />
        </>

      }
    </>
  );
};
