import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { placeOrder } from '../api/ordersApi';
import DeliveryMap from '../ViewCommon/Maps/DeliveryMap';

let MapView: any;

type PlaceOrderScreenProps = {
    navigation: any;
    cart: any[];
    clearCart: () => void;
};

const PlaceOrderScreen: React.FC<PlaceOrderScreenProps> = ({ navigation, cart, clearCart }) => {
    const [address, setAddress] = useState('');



    const handlePlaceOrder = async () => {
        if (!address) {
            Alert.alert('Please complete all fields and select a location on the map.');
            return;
        }
        // Prepare order data
        const orderData = {
            addressData: {
                address: address,
            },
            cart,
        };
        const data = await placeOrder(orderData);

        Alert.alert('Order placed!', 'Your order has been sent for delivery.');
        clearCart();
        navigation.popToTop();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Delivery Details</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={{ width: 80, fontSize: 16 }}>Address:</Text>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
                <DeliveryMap
                    ref={(ref) => (MapView = ref)}
                    style={styles.map}
                    onLocationSelected={(location) => {
                        setAddress(location.address);
                    }}
                />
                <View style={{ flex: 1 }} />
                <View style={{ marginBottom: 16 }}>
                    <Button title="Place Order" onPress={handlePlaceOrder} color="#007AFF" />
                </View>
            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
});



export default PlaceOrderScreen;