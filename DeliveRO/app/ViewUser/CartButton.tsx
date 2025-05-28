import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CartButtonProps = {
    cart: any[];
};

const CartButton: React.FC<CartButtonProps> = ({ cart }) => {
    const navigation = useNavigation();
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('Cart' as never)}
            activeOpacity={0.8}
        >
            <View style={styles.inner}>
                <Text style={styles.icon}>🛒</Text>
                <Text style={styles.count}>{itemCount}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 32,
        backgroundColor: '#2196F3',
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 6,
        zIndex: 100,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 22,
        color: '#fff',
        marginRight: 8,
    },
    count: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CartButton;