import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDeliveryUserSalesData } from '../api/ordersApi';

interface DeliveryUserSalesDataInterval {
    ordersCount: number;
    totalSales: number;
}

interface DeliveryUserSalesData {
    lastDay: DeliveryUserSalesDataInterval;
    lastWeek: DeliveryUserSalesDataInterval;
    lastMonth: DeliveryUserSalesDataInterval;
}



const Card = ({ title, data }: { title: string; data: DeliveryUserSalesDataInterval }) => (
    <TouchableOpacity
        style={[
            cardStyles.card,
            {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 8,
                elevation: 6,
            },
        ]}
        activeOpacity={0.85}
    >
        <Text
            style={[
                cardStyles.cardTitle,
                {
                    color: '#2196F3',
                    letterSpacing: 1,
                    fontSize: 18,
                    marginBottom: 12,
                    textShadowColor: 'rgba(33,150,243,0.15)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                },
            ]}
        >
            {title}
        </Text>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
                alignItems: 'center',
            }}
        >
            <Text style={{ fontSize: 16, color: '#888' }}>Orders:</Text>
            <View
                style={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    minWidth: 40,
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1976d2' }}>
                    {data.ordersCount}
                </Text>
            </View>
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Text style={{ fontSize: 16, color: '#888' }}>Total Sales:</Text>
            <View
                style={{
                    backgroundColor: '#e8f5e9',
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    minWidth: 60,
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#43a047' }}>
                    {data.totalSales} RON
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const DeliveriesHistoryScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [salesData, setSalesData] = useState<DeliveryUserSalesData | null>(null);

    const fetchSalesData = useCallback(async () => {
        const data = await getDeliveryUserSalesData();
        setSalesData(data);
    }, []);

    useEffect(() => {
        if (isFocused) {
            fetchSalesData();
        }
    }, [isFocused, fetchSalesData]);

    return (
        <View style={styles.container}>
            {salesData && (
                <View style={{ width: '100%', marginBottom: 24 }}>
                    <Card title="Last Day" data={salesData.lastDay} />
                    <Card title="Last Week" data={salesData.lastWeek} />
                    <Card title="Last Month" data={salesData.lastMonth} />
                </View>
            )}
            <Button
                title="View All Deliveries"
                onPress={() => navigation.navigate('Deliveries')}
                color="#2196F3"
            />
        </View>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
});

export default DeliveriesHistoryScreen;