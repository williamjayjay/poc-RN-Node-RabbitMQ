import React, { useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, Text, } from "react-native";
import { Svg } from "react-native-svg";
import { NumberValue } from "d3-scale";
import { Ionicons } from '@expo/vector-icons';
import colors from '@/styles/colors.json'

export const { width: size } = Dimensions.get("window");

import Animated, {
  SharedValue,
  measure,
  runOnJS,
  useAnimatedRef,
  withTiming,
} from 'react-native-reanimated';
import { ICandle } from "@/models/CandleModel";
import { CandleIndividual } from "@/components/Candle";
import { useChart } from "./index.hook";

interface ChartProps {
  numberGrid: number;
  domain: NumberValue[] | { valueOf(): number } | any;
  candles: ICandle[]
  scaleYCandle: SharedValue<number>
}

export const Chart = (({ candles, domain, numberGrid, scaleYCandle }: ChartProps) => {

  const animatedRef = useAnimatedRef();

  const {
    handleOnSelectOrUnselectCandle,
    onReturnIconColorAndName,
    onReturnColorHighOrLow,
    handleGetData,
    onReturnCalcSizesData,
  } = useChart(numberGrid);


  const { dataSelected, dateFormated } = handleGetData()
  const { fixMargin, scaleBody, scaleY, widthAdjusted } = onReturnCalcSizesData({ candles, domain, scaleYCandle: scaleYCandle.value })

  const [text, setText] = React.useState(scaleYCandle.value);

  const handlePress = () => {
    if (scaleYCandle.value <= size) {

      scaleYCandle.value = withTiming(scaleYCandle.value + 60, {}, () => {
        const measurement = measure(animatedRef);
        if (measurement === null) {
          return;
        }
        runOnJS(setText)(Math.floor(measurement.height));
      });
    }

  };

  useEffect(() => {
    handlePress()

  }, [scaleYCandle.value,])


  return (
    <>

      <View collapsable={false} className="justify-between flex-1 "  >
        <View collapsable={false} style={{
          zIndex: 999, justifyContent: 'space-between', width: size - 2,
          alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start'

        }} >

          <View className="items-start" >
            <View className="items-center justify-center gap-2 flex-row" >
              <Text numberOfLines={1} className=" text-neutral-400  text-lg font-quattrocentoregular "   >Open: $</Text>
              <Text numberOfLines={1} className=" text-white font-semibold text-lg font-quattrocentoregular"  >{dataSelected?.open || '-'}</Text>
            </View>

            <View className="items-center justify-center gap-2 flex-row" >
              <Text numberOfLines={1} className=" text-neutral-400  text-lg font-quattrocentoregular"  >Close: $</Text>
              <Text numberOfLines={1} className=" text-white font-semibold text-lg font-quattrocentoregular"  >{dataSelected?.close || '-'}</Text>
            </View>

            <View className="items-center justify-center gap-2 flex-row" >
              <Text numberOfLines={1} className=" text-neutral-400 text-sm font-quattrocentoregular"  >Time: </Text>
              <Text numberOfLines={1} className=" text-white text-sm font-quattrocentoregular"  >{dateFormated}</Text>
            </View>

          </View>

          <View>

            <View className="items-center justify-center gap-2 flex-row" >
              <Text numberOfLines={1} className=" text-signal-200  text-lg font-quattrocentoregular"  >High: $</Text>
              <Text numberOfLines={1} className=" text-signal-200 font-semibold text-lg font-quattrocentoregular"  >{dataSelected?.high || '-'}</Text>
            </View>

            <View collapsable={false} className="items-center justify-center gap-2 flex-row" >
              <Text numberOfLines={1} className=" text-signal-300  text-lg font-quattrocentoregular"  >Low: $</Text>
              <Text numberOfLines={1} className=" text-signal-300 font-semibold text-lg font-quattrocentoregular"  >{dataSelected?.low || '-'}</Text>
            </View>

          </View>

        </View>

        {candles && <Animated.View collapsable={false} ref={animatedRef} className='items-end self-end ' style={{ height: scaleYCandle }} >
          <Svg width={size} height={size - 20}  >
            {candles?.map((candle: any, index: any) => {

              return (
                <CandleIndividual
                  key={candle._id}
                  {...{ candle, index, width: widthAdjusted, scaleY, scaleBody }}
                />
              )
            })}
          </Svg>
        </Animated.View>}

      </View >

      {candles && <View
        collapsable={false}
        style={{
          zIndex: 999, justifyContent: 'space-between', width: size - 2,
          alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
        }} >

        {candles?.map((candle, index) => {
          let max = Math.max(candle.open, candle.close)
          let min = Math.min(candle.open, candle.close)
          let value = (scaleBody(max - min))

          return (
            <TouchableOpacity

              key={candle._id}
              className="items-center justify-center "
              style={{
                width: fixMargin + 2, zIndex: 999,
              }}

              onPress={() => (handleOnSelectOrUnselectCandle({ candle: candle, selectedCandleId: handleGetData()?.dataSelected?._id }))}
            >

              <View
                collapsable={false}
                style={{
                  width: fixMargin, height: size - 20, zIndex: 999,
                  alignSelf: 'center',
                  borderWidth: onReturnIconColorAndName({ candle: candle, selectedCandleId: handleGetData()?.dataSelected?._id }).opacity,
                  borderColor: colors.neutral[500],
                }}
              >

              </View>

              <Text numberOfLines={1} className="text-main-50 " style={{ marginTop: 20, color: onReturnColorHighOrLow(candle.color) }} >{candle.close?.toFixed(2)}</Text>
              <Ionicons name={onReturnIconColorAndName({ candle: candle, selectedCandleId: handleGetData()?.dataSelected?._id }).name} size={20} color={onReturnIconColorAndName({ candle: candle, selectedCandleId: handleGetData()?.dataSelected?._id }).color} />

            </TouchableOpacity>

          )
        })}

      </View>}
    </>
  );
})


