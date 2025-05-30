import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { retrieveOrderDetails } from '../api/ordersApi';
import { constants } from '../constants/constants';

type RootStackParamList = {
    OrderDetails: { orderId: string };
};

type OrderDetailsScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: number;
    image: string;
}

interface ProductItemData {
    id: string;
    name: string;
    image: string;
}

interface OrderItemData {
    id: string;
    price: number;
    quantity: number;
    product: ProductItemData;
}

interface OrderDetails {
    id: string;
    user: UserData;
    deliveryUser?: UserData;
    createdOn: string;
    address: string;
    orderItems: OrderItemData[];
    total: number;
    status: number;
}

const cardStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
} as any;


const OrderDetailsScreen: React.FC = () => {
    const route = useRoute<OrderDetailsScreenRouteProp>();
    const { orderId } = route.params;
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [orderDetails, setOrderDetails] = React.useState<OrderDetails>({} as OrderDetails);

    useEffect(() => {
        //setIsLoading(true);
        const fetchData = async () => {
            const data = await retrieveOrderDetails(orderId);
            setOrderDetails(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const getOrderStatusColor = (orderDetails: OrderDetails) => {
        return orderDetails.status === constants.OrderStatusNames.Pending
            ? '#ff9800'
            : orderDetails.status === constants.OrderStatusNames['Delivery In Progress']
                ? '#1976d2'
                : orderDetails.status === constants.OrderStatusNames.Delivered
                    ? '#2e7d32'
                    : orderDetails.status === constants.OrderStatusNames.Cancelled
                        ? 'red'
                        : '#bdbdbd'
    };

    if (isLoading || !orderDetails.id) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View
                style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    borderColor: getOrderStatusColor(orderDetails),
                    borderWidth: 2,
                    elevation: 2,
                }}
            >
                <View
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        marginRight: 12,
                        backgroundColor:
                            getOrderStatusColor(orderDetails),
                    }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Status: {constants.OrderStatus[orderDetails.status] || 'Unknown'}
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'column', // Changed from 'row' to 'column'
                    alignItems: 'flex-start', // Align items to the start (left)
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Order Details</Text>
                <Text style={{ marginBottom: 4 }}>Order ID: #{orderDetails.id?.split('-')[0] || ''}</Text>
                <Text style={{ marginBottom: 4 }}>Created On: {new Date(orderDetails.createdOn).toLocaleString()}</Text>
                <Text style={{ marginBottom: 4 }}>Address: {orderDetails.address}</Text>
            </View>
            {orderDetails.deliveryUser && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    {orderDetails.deliveryUser.image ? (
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${orderDetails.deliveryUser.image}` }}
                            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }}
                        />
                    ) : (
                        <View
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: '#ccc',
                                marginRight: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff' }}>N/A</Text>
                        </View>
                    )}
                    <Text>
                        Delivery User: {orderDetails.deliveryUser.firstName} {orderDetails.deliveryUser.lastName} ({orderDetails.deliveryUser.email})
                    </Text>
                </View>
            )}

            {orderDetails.orderItems && orderDetails.orderItems.length > 0 ? (
                <View
                    style={{
                        backgroundColor: '#f5f5f5',
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <FlatList
                        data={orderDetails.orderItems}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View
                                style={cardStyle}
                            >
                                <View
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        backgroundColor: '#f0f0f0',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 12,
                                    }}
                                >
                                    {item.product.image ? (
                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${item.product.image}` }}
                                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                        />
                                    ) : (
                                        <Text>No Image</Text>
                                    )}
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>
                                        {item.product.name}
                                    </Text>
                                    <Text>Quantity: {item.quantity}</Text>
                                    <Text style={{ color: 'green' }}>Price: {item.price} RON</Text>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{ paddingVertical: 4 }}
                        style={{ maxHeight: 100 }}
                    />
                </View>
            ) : (
                <Text>No items in this order.</Text>
            )}
            <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Total:</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2e7d32' }}>
                {orderDetails.total} RON
            </Text>
        </View>
    );
};

export default OrderDetailsScreen;