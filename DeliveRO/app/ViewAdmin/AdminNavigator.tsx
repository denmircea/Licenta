import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import { ProfileMainNavigator } from '../ViewCommon/ProfileScreen';
import ProductsMainNavigator from './Products/ProductsMainNavigator';

export function AdminNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'Products') {
                        iconName = 'shopping-cart';
                    } else if (route.name === 'Sales') {
                        iconName = 'bar-chart';
                    } else if (route.name === 'Profile') {
                        iconName = 'group';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
            })}
        >
            <Tab.Screen
                options={{ headerShown: false }}
                name="Products"
                component={ProductsMainNavigator} />
            <Tab.Screen
                name="Sales"
                component={() => <></>}
            />
            <Tab.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={ProfileMainNavigator}
            />
        </Tab.Navigator>
    );
}

export default AdminNavigator;
