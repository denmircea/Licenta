import React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import Slider from 'react-native-slide-to-unlock'; // Ensure you have this package installed
import { constants } from '../constants/constants';

type CurrentOrderComponentProps = {
    order: {
        id: string;
        userId: string;
        createdOn: string;
        address: string;
        total: number;
        status: number;
    };
    onFinalizeOrder: () => void;
};

const CurrentOrderComponent: React.FC<CurrentOrderComponentProps> = ({ order, onFinalizeOrder }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Current Delivery</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Order #{order.id.split('-')[0]}</Text>
                <Text style={styles.info}>Placed on: {new Date(order.createdOn).toLocaleString()}</Text>
                <Text style={styles.info}>Address: {order.address}</Text>
                <Text style={styles.info}>Status: {constants.OrderStatus[order.status] || 'Unknown'}</Text>
                <Text style={styles.total}>Total: {order.total.toFixed(2)} {constants.currency}</Text>
            </View>
            <View style={styles.bottomContainer}>
                {/* You can use a third-party slider button, e.g., react-native-slide-to-unlock */}
                {/* Install: npm install react-native-slide-to-unlock */}
                {/* Import at the top: import SlideToUnlock from 'react-native-slide-to-unlock'; */}
                {/* Replace the below with your preferred slider if needed */}
                {/* @ts-ignore */}
                {Platform.OS === 'web' ? (
                    <View style={{ width: '100%' }}>
                        <Button
                            title="Confirm Delivery"
                            color="#2196F3"
                            onPress={onFinalizeOrder}
                        />
                    </View>
                ) : (
                    <View style={{ width: '90%' }}>
                        {/* @ts-ignore */}
                        <Slider
                            onEndReached={onFinalizeOrder}
                            containerStyle={{
                                backgroundColor: '#2196F3',
                                borderRadius: 30,
                                padding: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 8,
                                overflow: 'hidden',
                            }}
                            sliderElement={
                                <View style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 26,
                                    width: 52,
                                    height: 52,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    elevation: 2,
                                }}>
                                    <Text style={{ color: '#2196F3', fontWeight: 'bold', fontSize: 18 }}>{'→'}</Text>
                                </View>
                            }


                        >
                            <Text>{'Slide to confirm delivery'}</Text>
                        </Slider>

                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 18,
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    label: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
    info: { color: '#555', marginBottom: 4, fontSize: 15 },
    total: { color: '#2e7d32', fontWeight: 'bold', fontSize: 17, marginTop: 8 },
    bottomContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 24,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#2196F3',
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '90%',
        elevation: 3,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
        elevation: 5,
    },
});

export default CurrentOrderComponent;