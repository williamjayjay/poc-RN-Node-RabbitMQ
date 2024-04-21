import { useCallback, useState } from "react";
import { ICandle } from "@/models/CandleModel";
import colors from '@/styles/colors.json'

interface IAxisLineComponent {
  width: number;
  index: number;
}

export const useCandleIndividual = () => {

  const onReturnHighOrLow = useCallback(({ open, close }: Pick<ICandle, 'open' | 'close'>) => {
    const highOrLow = close > open ? colors.signal[200] : colors.signal[300];
    return { highOrLow }
  }, []);

  const onReturnAxisXYLineComponent = useCallback(({ width, index }: IAxisLineComponent) => {
    const xCalc = index * width;
    const xAxis = xCalc + width / 2
    return { xAxis }
  }, []);

  const onReturnAxisAndSizeRectComponent = useCallback(({ width, index }: IAxisLineComponent) => {
    const MARGIN = 2;
    const xCalc = index * width;
    const widthRect = width - MARGIN * 2

    const xAxisRect = xCalc + MARGIN

    return { xAxisRect, widthRect }
  }, []);

  const onReturnMaxAndMin = useCallback(({ open, close }: Pick<ICandle, 'open' | 'close'>) => {
    const maxValue = Math.max(open, close);
    const minValue = Math.min(open, close);

    return { maxValue, minValue }
  }, []);

  return {
    onReturnHighOrLow,
    onReturnAxisXYLineComponent,
    onReturnAxisAndSizeRectComponent,
    onReturnMaxAndMin

  };
};
