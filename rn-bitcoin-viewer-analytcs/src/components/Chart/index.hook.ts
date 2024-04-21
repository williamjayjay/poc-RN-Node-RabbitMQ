import React, { useCallback, useState } from "react";
import { ICandle } from "@/models/CandleModel";
import colors from '@/styles/colors.json'
import { Ionicons } from '@expo/vector-icons';
import dayjs from "dayjs";
import { Dimensions } from "react-native";
import { NumberValue, scaleLinear } from "d3-scale";


interface INameAndColorIcon {
  color: string;
  name: keyof typeof Ionicons.glyphMap
  opacity: number;
}

interface IDataSelected {
  candle: ICandle;
  selectedCandleId?: string | null;
}

interface ICalcSizesData {
  candles: ICandle[];
  domain: NumberValue[] | { valueOf(): number } | any;
  scaleYCandle: number;
}

const { width: sizeDevice } = Dimensions.get("window");

export const useChart = (numberGrid: number) => {

  const [dataSelected, setDataSelected] = useState<ICandle | null>(null);
  const [numberGridSaved, setNumberGridSaved] = useState(numberGrid);

  useCallback(
    () => {
      if (numberGrid !== numberGridSaved) {
        setNumberGridSaved(numberGrid)
        return setDataSelected(null)

      }
    },
    [numberGrid],
  )


  const handleOnSelectOrUnselectCandle = useCallback(({ candle, selectedCandleId }: IDataSelected) => {

    if (selectedCandleId === candle._id) {
      setDataSelected(null)
      return null

    }
    setDataSelected(candle)
    return candle

  }, []);

  const onReturnCalcSizesData = useCallback(({ candles, domain, scaleYCandle }: ICalcSizesData) => {

    const widthAdjusted = sizeDevice / candles?.length;

    const scaleY = scaleLinear()?.domain(domain).range([sizeDevice, 30]);

    const scaleBody = scaleLinear()
      ?.domain([0, Math.max(...domain) - Math.min(...domain)])
      ?.range([0, (scaleYCandle >= sizeDevice ? sizeDevice - 0 : scaleYCandle)]);

    const fixMargin = widthAdjusted - 2 * 2

    return { scaleY, scaleBody, fixMargin, widthAdjusted }

  }, []);


  const handleGetData = useCallback(() => {

    const dateFormated = dataSelected?.finalDateTime ? dayjs?.(dataSelected?.finalDateTime)?.format('YYYY/MM/DD [at] HH:mm:ss') : '-'

    return { dataSelected, dateFormated }

  }, [dataSelected]);


  const onReturnIconColorAndName = useCallback(({ candle, selectedCandleId }: IDataSelected) => {
    if (selectedCandleId === candle?._id) {
      return { name: "chevron-up", opacity: 1, color: colors.signal[100] } as INameAndColorIcon
    }
    return { name: "chevron-down", opacity: 0, color: colors.neutral[500] } as INameAndColorIcon
  }, [dataSelected]);

  const onReturnColorHighOrLow = useCallback((color: string) => {
    switch (color) {
      case 'green':
        return colors.signal[200]
      case 'red':
        return colors.signal[300]

      default:
        return colors.neutral[500]
    }

  }, [dataSelected]);



  return {
    handleOnSelectOrUnselectCandle,
    onReturnIconColorAndName,
    onReturnColorHighOrLow,
    handleGetData,
    setDataSelected,
    onReturnCalcSizesData,


  };
};
