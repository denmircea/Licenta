import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Platform, Text, View } from 'react-native';

let MapView, Marker, Polyline;
if (Platform.OS !== 'web') {
    MapView = require('react-native-maps').default;
    Marker = require('react-native-maps').Marker;
    Polyline = require('react-native-maps').Polyline;
}

export const MapDestinationPointComponent = (props) => {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setCurrentLocation(props.destination);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, [props.destination]);

    if (Platform.OS === 'web') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <Text>Map is not available on web.</Text>
            </View>
        );
    }

    if (!currentLocation) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Helper function to open directions in maps app
    const openDirections = (destination) => {
        const lat = destination.latitude;
        const lng = destination.longitude;
        const label = encodeURIComponent('Destination');
        let url = '';
        if (Platform.OS === 'ios') {
            url = `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
        } else {
            url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
        }
        // Use Linking to open the URL
        require('react-native').Linking.openURL(url);
    };

    return (
        <View>
            <View style={{ position: 'absolute', top: 16, left: 16, right: 16, zIndex: 1 }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: '#e0e0e0', borderRadius: 6, overflow: 'hidden' }}>
                        <Button
                            title="Get Directions"
                            onPress={() => openDirections(props.destination)}
                            color={'#757575'}
                        />
                    </View>
                </View>
            </View>
            <MapView
                style={{ width: '100%', height: 300 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: props.destination.latitude,
                        longitude: props.destination.longitude,
                    }}
                    title="Destination"
                    onPress={() => openDirections(props.destination)}
                />
                <Marker
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    title="You"
                    pinColor="blue"
                />
                <Polyline
                    coordinates={[
                        {
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        },
                        {
                            latitude: props.destination.latitude,
                            longitude: props.destination.longitude,
                        },
                    ]}
                    strokeColor="#007AFF"
                    strokeWidth={4}
                />
            </MapView>
        </View>
    );
};

