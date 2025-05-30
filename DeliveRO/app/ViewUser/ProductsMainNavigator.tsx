import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

export type ProductsStackParamList = {
    ProductsList: undefined;
    Cart: undefined;
};

const Stack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsMainNavigator = () => {
    const [cart, setCart] = useState<any[]>([]);

    const clearCart = () => setCart([]);

    const addToCart = (item: any) => setCart((prev) => {
        const existingItem = prev.find((i) => i.id === item.id);
        if (existingItem) {
            return prev.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        }
        return [...prev, { ...item, quantity: 1 }];

    });
    const removeFromCart = (id: string) =>
        setCart((prev) => {
            const existingItem = prev.find((i) => i.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prev.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prev.filter((i) => i.id !== id);
        });

    return (
        <>
            <Stack.Navigator initialRouteName="ProductsList">
                <Stack.Screen
                    name="ProductsList"
                    options={{ title: 'Products' }}
                >
                    {(props) => (
                        <ProductsScreen
                            {...props}
                            addToCart={addToCart}
                            cart={cart}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Cart"
                    options={{ title: 'Your Cart' }}
                >
                    {(props) => (
                        <CartScreen
                            {...props}
                            cart={cart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                        />
                    )}
                </Stack.Screen>
                 <Stack.Screen
                    name="PlaceOrder"
                    options={{ title: 'Place Order' }}
                >
                    {(props) => (
                        <PlaceOrderScreen
                            {...props}
                            cart={cart} 
                            clearCart={clearCart}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>

            {/* Floating cart button */}
        </>
    );
};

import CartScreen from './CartScreen';
import PlaceOrderScreen from './PlaceOrderScreen';
import ProductsScreen from './ProductsScreen';

export default ProductsMainNavigator;