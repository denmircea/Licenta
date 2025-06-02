import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// More zoom: smaller latitudeDelta/longitudeDelta
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DeliveryMap = () => {
  if (Platform.OS === 'web') {
    return (
      <View>
        <Text>Map feature is not available on web.</Text>
      </View>
    );
  }
  const [initialRegion, setInitialRegion] = useState({
    latitude: 44.3168, // Default to Bucharest, Romania
    longitude: 23.8025,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [deliveryLocation, setDeliveryLocation] = useState(initialRegion);
  const mapRef = useRef(null);

  useEffect(() => {
    // Optionally, get user's current location here
  }, []);

  const handleDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDeliveryLocation({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDeliveryLocation({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          onPress={handleMapPress}
        >
          <Marker
            draggable
            coordinate={{
              latitude: deliveryLocation.latitude,
              longitude: deliveryLocation.longitude,
            }}
            onDragEnd={handleDragEnd}
            title="Delivery Location"
            description="Drag to set your delivery point"
          />
        </MapView>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>
          Latitude: {deliveryLocation.latitude.toFixed(6)}
        </Text>
        <Text style={styles.locationText}>
          Longitude: {deliveryLocation.longitude.toFixed(6)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  mapWrapper: {
    width: '100%',
    height: 320,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#2196F3',
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationInfo: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default DeliveryMap;