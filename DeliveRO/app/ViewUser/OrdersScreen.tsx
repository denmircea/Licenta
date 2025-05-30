import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { retrieveUserOrders } from '../api/ordersApi';
import { constants } from '../constants/constants';

export interface Order {
    id: string;
    userId: string;
    createdOn: string;
    address: string;
    total: number;
    status: number;
}

const OrdersScreen: React.FC = (props) => {
    const isFocused = useIsFocused(); // Placeholder for useIsFocused hook
    const [orders, setOrders] = React.useState<Order[]>([]); // Placeholder for orders state
    useEffect(() => {
        if (isFocused) {
            const fetchOrders = async () => {
                const order = await retrieveUserOrders();
                setOrders(order);
            };
            fetchOrders();
        }
    }, [isFocused]);

    const getOrderStatusColor = (status: number) => {
        switch (status) {
            case constants.OrderStatusNames.Pending:
                return 'orange'; // Orange
            case constants.OrderStatusNames['Delivery In Progress']:
                return 'blue'; // Blue
            case constants.OrderStatusNames.Delivered:
                return 'green'; // Green
            case constants.OrderStatusNames.Cancelled:
                return 'dark'; // Dark Red
            default:
                return '#9e9e9e'; // Grey for unknown status
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 16 }}>
            {orders.length > 0 ? (
            <FlatList
                data={orders}
                keyExtractor={(order) => order.id}
                renderItem={({ item: order }) => (
                <View
                    style={{
                    backgroundColor: '#fff',
                    marginBottom: 12,
                    borderRadius: 8,
                    padding: 0,
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                    borderWidth: 2,
                    borderColor: getOrderStatusColor(order.status),
                    }}
                >
                    <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        props.navigation.navigate('OrderDetails', { orderId: order.id });
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
                    >
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                        Order #{order.id.split('-')[0]}
                        </Text>
                        <Text style={{ color: '#555', marginBottom: 2 }}>
                        Placed on: {new Date(order.createdOn).toLocaleString()}
                        </Text>
                        <Text style={{ color: '#555', marginBottom: 2 }}>
                        Address: {order.address}
                        </Text>
                        <Text style={{ color: '#555', marginBottom: 2 }}>
                        Status: {constants.OrderStatus[order.status] || 'Unknown'}
                        </Text>
                        <Text style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: 15 }}>
                        Total: {order.total.toFixed(2)} {constants.currency}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 40, color: '#bbb', marginLeft: 10 }}>{'>'}</Text>
                    </TouchableOpacity>
                </View>
                )}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
            ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                <Text style={{ color: '#888', fontSize: 16 }}>No orders found.</Text>
            </View>
            )}
        </View>
    );
};

export default OrdersScreen;