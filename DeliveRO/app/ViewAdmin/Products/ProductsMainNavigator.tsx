import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddEditProductScreen from './AddEditProductScreen';
import ProductsScreen from './ProductsScreen';


// Example screens (replace with your actual screens)

export type ProductsStackParamList = {
    ProductsList: undefined;
    ProductDetails: { productId: string };
};

const Stack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsMainNavigator = () => (
    <Stack.Navigator initialRouteName="ProductsList">
        <Stack.Screen
            name="ProductsList"
            component={ProductsScreen}
            options={{ title: 'Products' }}
        />
        <Stack.Screen
            name="AddEditProduct"
            component={AddEditProductScreen}
            options={{ title: 'Product Details' }}
        />
    </Stack.Navigator>
);

export default ProductsMainNavigator;