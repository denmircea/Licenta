import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderDetailsScreen from "./OrderDetailScreen";
import OrdersScreen from "./OrdersScreen";

export const OrdersMainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Orders">
            <Stack.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ title: 'Orders' }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{ title: 'Order Details' }}
            />
        </Stack.Navigator>
    )
};

export default OrdersMainNavigator;