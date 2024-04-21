import { useCallback, useRef, useState } from "react";
import { ICandle } from "@/models/CandleModel";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import Toast from "react-native-toast-message";
import { Audio } from 'expo-av';
import { Sound } from "expo-av/build/Audio";
export const useTradeView = () => {
  // const [candles, setCandles] = useState<ICandle[]>(convertedData as ICandle[]);  // TESTE LOCAL
  const [candles, setCandles] = useState<ICandle[] | undefined>()
  const [candlesInitial, setCandlesInitial] = useState<ICandle[] | undefined>()
  const [numberGrid, setNumberGrid] = useState(9)

  const soundRef = useRef<Sound>()

  const onLoadSound = useCallback(() => {
    try {

      const loadSound = async () => {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require('@assets/sound/bitcoin_sound.mp3')
        );
        soundRef.current = soundObject
      };

      loadSound()

    } catch (error) {
      console.log('Erro ao reproduzir o som:', error);

    }
  }, []);


  const speakSound = useCallback(() => {
    soundRef.current?.playAsync()
  }, [soundRef, soundRef.current]);


  const onReturnCandles = useCallback((): ICandle[] | undefined => {
    return candles
  }, [candles]);

  const onReturnCandlesInitial = useCallback((): ICandle[] | undefined => {
    return candles
  }, [candlesInitial]);


  const onReturnNumberGrid = useCallback((): number => {
    return numberGrid
  }, [numberGrid]);



  const onFindCandles = useCallback(async (messageToast: string) => {
    try {

      const response = await api.get(`/candles/9}`);

      let resposta = (response.data).reverse();

      Toast.show({
        text1: messageToast,
        type: 'success',
      });

      onUpdateCandles(resposta)

      onUpdateCandlesInitial(resposta)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os dados do bitcoin';

      Toast.show({
        text1: title,
        type: 'error',
      });

    }

  }, []);


  const onUpdateNumberGrid = useCallback((value: number) => {
    setNumberGrid(value)
    return
  }, []);


  const onUpdateCandles = useCallback((candles: ICandle[] | undefined) => {
    setCandles(candles)
    return
  }, []);


  const onUpdateCandlesInitial = useCallback((candles: ICandle[]) => {
    setCandlesInitial(candles)
    return
  }, []);



  const handleChangeGrid = useCallback(({ candles, numberGrid, candlesInitial }: any) => {

    if (!candles) {
      return
    }

    if (numberGrid === 9) {
      onUpdateNumberGrid(3)
      onUpdateCandles(candlesInitial?.slice(-3));
    }

    if (numberGrid === 3) {
      onUpdateNumberGrid(6)
      onUpdateCandles(candlesInitial?.slice(-6));
    }

    if (numberGrid === 6) {
      onUpdateNumberGrid(9)
      onUpdateCandles(candlesInitial?.slice(-9));
    }

  }, []);


  const onGetDomainToCalculate = useCallback((rows: ICandle[] | undefined) => {
    if (!rows) {
      return
    }
    const values = rows?.map(({ high, low }: any) => [high, low])?.flat();
    return [Math?.min(...values), Math?.max(...values)];
  }, []);

  return {
    onReturnCandles,
    onReturnCandlesInitial,
    onFindCandles,
    onReturnNumberGrid,
    onUpdateNumberGrid,
    onUpdateCandles,
    onUpdateCandlesInitial,
    handleChangeGrid,
    onGetDomainToCalculate,
    onLoadSound,
    speakSound,
  };
};
