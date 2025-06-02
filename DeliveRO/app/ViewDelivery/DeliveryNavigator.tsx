import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Icon } from 'react-native-elements';
// import DeliveryOrdersScreen from './DeliveryOrdersScreen';
// import DeliveryOrderDetailsScreen from './DeliveryOrderDetailsScreen';
// import DeliveryProfileScreen from './DeliveryProfileScreen';
import { ProfileMainNavigator } from '../ViewCommon/ProfileScreen';
import NewOrdersScreen from './NewOrdersScreen';

export function DeliveryNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'Deliveries') {
                        iconName = 'local-shipping';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'green',
            })}
        >
            <Tab.Screen
                name="New Orders"
                component={NewOrdersScreen}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Deliveries"
                component={DeliveriesMainNavigator}
            />
            <Tab.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={ProfileMainNavigator}
            />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

const DeliveriesMainNavigator = () => (
    <Stack.Navigator initialRouteName="Deliveries">
        <Stack.Screen
            name="Deliveries"
            component={ProfileMainNavigator}
            options={{ title: 'Deliveries', headerShown: false }}
        />
        <Stack.Screen
            name="DeliveryOrderDetails"
            component={ProfileMainNavigator}
            options={{ title: 'Delivery Details', headerShown: false }}
        />
    </Stack.Navigator>
);

export default DeliveryNavigator;