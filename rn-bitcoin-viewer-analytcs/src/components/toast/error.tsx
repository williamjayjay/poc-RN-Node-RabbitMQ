import { MaterialIcons } from '@expo/vector-icons';
import { VStack, Text, HStack, Icon } from 'native-base';
import { type FC } from 'react';
import { type ToastConfigParams } from 'react-native-toast-message';

namespace IToastError {
    export type Input = ToastConfigParams<any>;
}
export const ToastError: FC<IToastError.Input> = (props) => (

    <VStack bg='red.500' w='90%' rounded='sm' p='2'>

        <HStack alignItems='center' >

            <Icon
                size='sm'
                as={MaterialIcons}
                name="error-outline"
                color="white"
            />
            <Text flexShrink={1} numberOfLines={2} color="white" fontWeight="medium" fontSize="md" ml='1.5' >
                {props.text1}

            </Text>
        </HStack>
    </VStack>


);