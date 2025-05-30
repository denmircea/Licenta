import React from 'react';
import { Platform } from 'react-native';
import { NativeMapView } from './NativeMapView';
import { WebMapView } from './WebMapView';

const CustomMapView: React.FC = (props) => {
    if (Platform.OS === 'web') {
        return <WebMapView {...props}/>;
    }
    return <NativeMapView {...props}/>;
};

export default CustomMapView;