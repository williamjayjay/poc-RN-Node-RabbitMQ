import { VStack, Text, HStack, Icon } from 'native-base';
import { type FC } from 'react';
import { type ToastConfigParams } from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

namespace IToastSuccess {
    export type Input = ToastConfigParams<any>;
}
export const ToastSuccess: FC<IToastSuccess.Input> = (props) => (


    <VStack bg='green.500' w='90%' rounded='sm' p='2'>

        <HStack alignItems='center' >

            <Icon
                size='sm'
                as={MaterialIcons}
                name="check-circle-outline"
                color="white"
            />
            <Text flexShrink={1} numberOfLines={2} color="white" fontWeight="medium" fontSize="md" ml='1.5' >
                {props.text1}

            </Text>
        </HStack>
    </VStack>


);