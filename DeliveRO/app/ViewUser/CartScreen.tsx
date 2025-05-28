import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { constants } from '../constants/constants';

type CartScreenProps = {
    cart: any[];
    removeFromCart: (id: string) => void;
    addToCart: (item: any) => void;
};

const CartScreen: React.FC<CartScreenProps> = ({ cart, removeFromCart, addToCart }) => {
    // Group cart items by id and sum their quantities
    const groupCartItems = (cart: any[]) => {
        const grouped: { [id: string]: any } = {};
        cart.forEach(item => {
            if (grouped[item.id]) {
                grouped[item.id].quantity += item.quantity || 1;
            } else {
                grouped[item.id] = { ...item, quantity: item.quantity || 1 };
            }
        });
        return Object.values(grouped);
    };

    const groupedCart = groupCartItems(cart);

    const getTotal = () => {
        return groupedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={groupedCart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: 12 }}>
                                <Image
                                    source={
                                        item?.image?.length > 0
                                            ? { uri: `data:image/png;base64,${item.image}` }
                                            : { uri: constants.NO_IMAGE_URL }
                                    }
                                    style={{ width: 50, height: 50, borderRadius: 8, backgroundColor: '#eee' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text>{item.description.substring(0, 30)}</Text>
                                <Text style={{ color: 'green' }}>Price: {item.price} {constants.currency}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ borderRadius: 20, overflow: 'hidden', marginHorizontal: 2 }}>
                                <Button
                                    title="-"
                                    color="#ff4444"
                                    onPress={() => removeFromCart(item.id)}
                                />
                            </View>
                            <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{item.quantity}</Text>
                            <View style={{ borderRadius: 20, overflow: 'hidden', marginHorizontal: 2 }}>
                                <Button
                                    title="+"
                                    color="#44cc44"
                                    onPress={() => addToCart(item)}
                                />
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Your cart is empty.</Text>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            {groupedCart.length > 0 && (
                <View style={styles.bottomBar}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalAmount}>{getTotal()} {constants.currency}</Text>
                    </View>
                    <Button
                        title="Place Order"
                        color="#007AFF"
                        onPress={() => {/* handle place order */ }}
                    />
                </View>
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
    emptyText: {
        marginTop: 32,
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginRight: 8,
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 8,
    },
});

export default CartScreen;