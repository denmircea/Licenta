import React from 'react';
import { Platform, View } from 'react-native';
import { NativeMapView } from './NativeMapView';

const CustomMapView: React.FC = (props) => {
    if (Platform.OS === 'web') {
        return (
           <View>

           </View>
        );
    }
    return <NativeMapView {...props} />;
};

export default CustomMapView;