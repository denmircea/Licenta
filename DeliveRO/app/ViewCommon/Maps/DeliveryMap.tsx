// import React, { useEffect, useRef, useState } from 'react';
// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Import PROVIDER_GOOGLE for explicit Google Maps usage

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const DeliveryMap = () => {
//   const [initialRegion, setInitialRegion] = useState({
//     latitude: 44.4268, // Default to Bucharest, Romania
//     longitude: 26.1025,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });

//   const [deliveryLocation, setDeliveryLocation] = useState(initialRegion);
//   const mapRef = useRef(null);

//   // You might want to get the user's current location on initial load
//   useEffect(() => {
//     // Example: Using Geolocation API (you'll need to install @react-native-community/geolocation)
//     // Geolocation.getCurrentPosition(
//     //   position => {
//     //     const { latitude, longitude } = position.coords;
//     //     const newRegion = {
//     //       latitude,
//     //       longitude,
//     //       latitudeDelta: LATITUDE_DELTA,
//     //       longitudeDelta: LONGITUDE_DELTA,
//     //     };
//     //     setInitialRegion(newRegion);
//     //     setDeliveryLocation(newRegion);
//     //     mapRef.current?.animateToRegion(newRegion, 1000);
//     //   },
//     //   error => Alert.alert('Error', 'Could not get current location.'),
//     //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     // );
//   }, []);

//   const handleDragEnd = (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setDeliveryLocation({
//       latitude,
//       longitude,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     });
//     console.log('New delivery location:', { latitude, longitude });
//     // Here you would typically reverse geocode the coordinates to get an address
//     // and store it in your application state or send it to a backend.
//   };

//   const handleMapPress = (e) => {
//     // Optionally, allow the user to tap on the map to move the pin
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setDeliveryLocation({
//       latitude,
//       longitude,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     });
//     mapRef.current?.animateToRegion({
//       latitude,
//       longitude,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     }, 500);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE} // Use PROVIDER_GOOGLE for consistent behavior across platforms
//         style={styles.map}
//         initialRegion={initialRegion}
//         showsUserLocation={true} // Shows the blue dot for the user's current location
//         onPress={handleMapPress} // Allows placing the pin by tapping
//       >
//         <Marker
//           draggable
//           coordinate={{
//             latitude: deliveryLocation.latitude,
//             longitude: deliveryLocation.longitude,
//           }}
//           onDragEnd={handleDragEnd}
//           title="Delivery Location"
//           description="Drag to set your delivery point"
//         />
//       </MapView>
//       <View style={styles.locationInfo}>
//         <Text style={styles.locationText}>
//           Latitude: {deliveryLocation.latitude.toFixed(6)}
//         </Text>
//         <Text style={styles.locationText}>
//           Longitude: {deliveryLocation.longitude.toFixed(6)}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   locationInfo: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//     elevation: 5, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   locationText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default DeliveryMap;