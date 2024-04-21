import React, { useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, Dimensions, Text } from 'react-native';
import bg from '@assets/images/background.png';

import { Feather } from '@expo/vector-icons';
import { Chart } from '@/components/Chart';

import data from "./data.json";
import { useSharedValue } from 'react-native-reanimated';
import { useTradeView } from './index.hook';
import { socket } from '@/services/api';

export const { width: size } = Dimensions.get("window");

// TESTE LOCAL
// const convertedData: ICandle[] = data.map((candle: any) => ({
//   ...candle,
//   finalDateTime: new Date(candle.finalDateTime)
// }));
// TESTE LOCAL

export function Dash() {
  const scaleYCandle = useSharedValue(0);

  const {
    onReturnCandles,
    onFindCandles,
    onReturnNumberGrid,
    onReturnCandlesInitial,
    handleChangeGrid,
    onGetDomainToCalculate,
    onLoadSound,
    speakSound,
  } = useTradeView();

  const candles = onReturnCandles()
  const candlesInitial = onReturnCandlesInitial()
  const numberGrid = onReturnNumberGrid()
  const domain = onGetDomainToCalculate(candles)

  useEffect(() => {
    onLoadSound()
    speakSound()
    onFindCandles('Preços do bitcoin encontrados!');
    socket.on('newCandle', () => {
      onLoadSound()
      scaleYCandle.value = 0;
      onFindCandles('Mudança no preço bitcoin!');
      speakSound()

    });

    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <ImageBackground blurRadius={3} source={bg} defaultSource={bg} className='bg-black flex-1' resizeMode="repeat">

      <View className="flex-1 flex pt-12 pb-12 h-full ">
        {!domain && !candles && <Text className='text-2xl text-white font-semibold mt-6 self-center' >Nenhum dado carregado.</Text>}
        {(domain && candles) && <Chart {...{ candles, domain, numberGrid, scaleYCandle }} />}
      </View>

      <View className='items-center justify-around flex-row mb-6 ' >
        <TouchableOpacity
          style={{ opacity: candles ? 1 : 0.3 }}

          disabled={!!!candles} className='bg-neutral-400 w-1/3 rounded-md items-center justify-center py-2 '
          onPress={() => handleChangeGrid({ candles, numberGrid, candlesInitial })} >
          <Feather name="zoom-in" size={30} color='#171717' />
        </TouchableOpacity>
      </View>
    </ImageBackground>

  );
}

