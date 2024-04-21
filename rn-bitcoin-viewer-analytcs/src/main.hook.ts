import {
  useFonts,
  Quattrocento_400Regular,
  Quattrocento_700Bold,
} from '@expo-google-fonts/quattrocento';

import {  useEffect,  useState } from 'react';
import { IMain } from './main.dto';


export const useMain = ({ awaitSplashTimer }: IMain.Input): IMain.Output => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Quattrocento_400Regular,
    Quattrocento_700Bold
  });

  useEffect(() => {
    let cleartimer: NodeJS.Timeout;

    if (fontsLoaded) {
      cleartimer = setTimeout(() => {
        setAppIsReady(true);
      }, awaitSplashTimer);
    }
    
    return () => {
      if (cleartimer) clearTimeout(cleartimer);
    };
  }, [ fontsLoaded]);

  const isLoaded = appIsReady || null 

  return {
    isLoaded,
  };
};
