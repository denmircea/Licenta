import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DeliveryMap = (props) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);

  // Get address from coordinates
  const fetchAddress = async (latitude, longitude) => {
    try {
      const results = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (results && results.length > 0) {
        const addr = results[0];
        const addressComputed = [addr.name, addr.city, addr.region, addr.country]
            .filter(Boolean)
            .join(', ')
        setAddress(addressComputed);
        props.setAddressExternal(addressComputed);
      } else {
        setAddress('Address not found');
      }
    } catch (e) {
      setAddress('Address not found');
    }
  };

  // When deliveryLocation changes, update parent and address
  useEffect(() => {
    props.onLocationSelected && props.onLocationSelected(deliveryLocation);
    if (deliveryLocation) {
      fetchAddress(deliveryLocation.latitude, deliveryLocation.longitude);
    }
  }, [deliveryLocation]);

  // Get initial location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permission to access location was denied');
          // Default to Bucharest if permission denied
          const fallbackRegion = {
            latitude: 44.3168,
            longitude: 23.8025,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          setInitialRegion(fallbackRegion);
          setDeliveryLocation(fallbackRegion);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setInitialRegion(region);
        setDeliveryLocation(region);
      } catch (e) {
        setLocationError('Could not get current location.');
        const fallbackRegion = {
          latitude: 44.3168,
          longitude: 23.8025,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setInitialRegion(fallbackRegion);
        setDeliveryLocation(fallbackRegion);
      }
    })();
  }, []);

  // When user moves the map, update deliveryLocation to center
  const onRegionChangeComplete = (region) => {
    setDeliveryLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };

  if (Platform.OS === 'web') {
    return (
      <View>
        <Text>Map feature is not available on web.</Text>
      </View>
    );
  }

  if (!initialRegion || !deliveryLocation) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text>Loading map...</Text>
        {locationError ? <Text style={{ color: 'red' }}>{locationError}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          region={deliveryLocation}
          showsUserLocation={true}
          onRegionChangeComplete={onRegionChangeComplete}
        />
        {/* Marker in the center of the map */}
        <View pointerEvents="none" style={styles.centerMarkerWrapper}>
          <View style={styles.centerMarker} />
        </View>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>
          Latitude: {deliveryLocation.latitude.toFixed(6)}
        </Text>
        <Text style={styles.locationText}>
          Longitude: {deliveryLocation.longitude.toFixed(6)}
        </Text>
        <Text style={styles.addressText}>
          {address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerMarkerWrapper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -16,
    marginTop: -32,
    zIndex: 10,
  },
  centerMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
  addressText: {
    fontSize: 15,
    color: '#444',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default DeliveryMap;