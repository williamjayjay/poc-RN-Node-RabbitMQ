import { StatusBar } from "react-native";
import { Dash } from "./screens/Dash";
import { IMain } from "./main.dto";
import { FC } from "react";
import { useMain } from "./main.hook";
import Toast from 'react-native-toast-message';
import { ToastSuccess } from '@components/toast/success';
import { ToastError } from '@components/toast/error';
import { NativeBaseProvider } from "native-base";

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

            <Dash />

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
