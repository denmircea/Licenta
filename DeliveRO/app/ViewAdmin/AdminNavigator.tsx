import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import ProductsScreen from './Products/ProductsScreen';

export function AdminNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Products') {
                iconName = 'shopping-cart';
                } else if (route.name === 'Sales') {
                iconName = 'bar-chart';
                } else if (route.name === 'Profile') {
                    iconName = 'user';
                }
                // Using react-native-vector-icons/Feather as an example
                // Make sure to install: npm install react-native-vector-icons
                // And import at the top:
                // import Feather from 'react-native-vector-icons/Feather';
                // Replace Feather with your preferred icon set if needed

                // @ts-ignore
                return <Icon name={iconName} size={size} color={color} />;
            },
            })}
        >
            <Tab.Screen name="Products" component={ProductsScreen} />
            <Tab.Screen name="Sales" component={() => <></>} />
            <Tab.Screen name="Profile" component={() => <></>} />
        </Tab.Navigator>
    );
}

export default AdminNavigator;
