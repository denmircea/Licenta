import React, { useEffect } from 'react';
import { Button, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getRecommendedProducts } from '../api/analyticsApi';
import renderProductCard from '../components/ProductCardComponent';
import { constants } from '../constants/constants';

type CartScreenProps = {
    cart: any[];
    removeFromCart: (id: string) => void;
    addToCart: (item: any) => void;
};

const CartScreen: React.FC<CartScreenProps> = ({ cart, removeFromCart, addToCart, navigation }) => {
    // Group cart items by id and sum their quantities
    const [showRecommendedPopup, setShowRecommendedPopup] = React.useState(false);
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

    let groupedCart = groupCartItems(cart);
    if (groupedCart?.length > 0) {
        groupedCart.push({
            id: 'unknown',
            name: 'Recommended Products',
        })
    }
    const getTotal = () => {
        return groupedCart.filter(f => f.id !== 'unknown').reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={groupedCart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if (item.id !== 'unknown') {
                        return (
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
                            </View>)
                    }
                    return (
                        <View
                            style={[
                                styles.itemRow,
                                {
                                    backgroundColor: '#f5f7fa',
                                    borderRadius: 10,
                                    marginVertical: 8,
                                    paddingVertical: 18,
                                    paddingHorizontal: 12,
                                    borderWidth: 1,
                                    borderColor: '#e0e6ed',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 4,
                                    elevation: 2,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    setShowRecommendedPopup(true);
                                }}
                            >
                                <Image
                                    source={{ uri: 'https://img.icons8.com/color/48/000000/idea.png' }}
                                    style={{ width: 36, height: 36, marginRight: 14 }}
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#007AFF', flex: 1 }}>
                                    Recommended Products
                                </Text>
                                <Text style={{ color: '#888', fontSize: 15 }}>
                                    Tap to view
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
                }
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
                    <View
                        style={{
                            width: '100%',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5,
                            borderRadius: 10,
                            backgroundColor: '#007AFF',
                        }}
                    >
                        <Button
                            title="Place Order"
                            color={Platform.OS === 'ios' ? '#fff' : '#007AFF'}
                            onPress={() => { navigation.navigate('PlaceOrder') }}
                        />
                    </View>
                </View>
            )}
            {showRecommendedPopup && (
                <RecommendedProductsComponent
                    setShowRecommendedPopup={setShowRecommendedPopup}
                    cart={groupedCart}
                    addToCart={addToCart}
                />
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

const RecommendedProductsComponent: React.FC<any> = ({ setShowRecommendedPopup, addToCart, cart }) => {
    const [recommendations, setRecommendations] = React.useState<any[]>(null);
    useEffect(() => {
        const fetchData = async () => {
            const recommendation = await getRecommendedProducts(cart.filter((f: any) => f.id != 'unknown').map((item: any) => item.id));
            setRecommendations(recommendation);
        };
        fetchData();
    }, []);
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                <TouchableOpacity
                    onPress={() => setShowRecommendedPopup(false)}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1,
                        padding: 6,
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#888' }}>×</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>Recommended Products</Text>
                {recommendations !== null ? (<View><Text style={{ marginBottom: 20 }}>Here are some products you might like based on your cart.</Text>
                    <FlatList
                        data={recommendations}
                        keyExtractor={(item) => item.id}
                        renderItem={(info) => renderProductCard({
                            ...info, addToCart: (data: any) => {
                                addToCart(data);
                                setShowRecommendedPopup(false);
                            }
                        })
                        }
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListEmptyComponent={
                            <Text style={{ textAlign: 'center', color: '#888', fontSize: 16 }}>No recommendations available.</Text>
                        }
                    />
                </View>) : (
                    <View>
                        <Text style={{ margin: 20 }}>Loading recommendations...</Text>
                    </View>
                )}
            </View>
        </View>
    );
}
