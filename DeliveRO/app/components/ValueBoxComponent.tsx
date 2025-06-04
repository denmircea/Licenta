import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

interface ValueBoxComponentProps {
    value: number | string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const ValueBoxComponent: React.FC<ValueBoxComponentProps> = ({
    value,
    containerStyle,
    textStyle,
}) => (
    <View
        style={{
            backgroundColor: '#e3f2fd',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 4,
            minWidth: 40,
            alignItems: 'center',
            ...(containerStyle || {}),
        }}
    >
        <Text
            style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#1976d2',
                ...(textStyle || {}),
            }}
        >
            {value}
        </Text>
    </View>
);

export default ValueBoxComponent;