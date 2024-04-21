import { StatusBar } from "react-native";
import { IMain } from "./main.dto";
import { FC } from "react";
import { useMain } from "./main.hook";
import Toast from 'react-native-toast-message';
import { ToastSuccess } from '@components/toast/success';
import { ToastError } from '@components/toast/error';
import { NativeBaseProvider } from "native-base";
import { TradeView } from "./screens/TradeView";

export const App: FC<IMain.Input> = (props = { awaitSplashTimer: 1000 }) => {
    const { isLoaded } = useMain(props);

    if (!isLoaded) {
        return null;
    }

    return (

        <NativeBaseProvider>

            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="transparent"
            />

            <TradeView />

            <Toast
                position="top"
                config={{
                    success: (props) => <ToastSuccess {...props} />,
                    error: (props) => <ToastError {...props} />,
                }}
            />

        </NativeBaseProvider>


    );
};
