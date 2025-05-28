import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import ProfileScreen from '../ViewCommon/ProfileScreen';
import ProductsMainNavigator from './ProductsMainNavigator';

export function UserNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'Products') {
                        iconName = 'shopping-cart';
                    } else if (route.name === 'Orders') {
                        iconName = 'list-alt';
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
                component={ProductsMainNavigator}
            />
            <Tab.Screen
                name="Orders"
                component={() => <></>}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}

export default UserNavigator;
