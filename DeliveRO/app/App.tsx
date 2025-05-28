import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Text } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen } from './components/Login';
import { onLogin, selectAuth } from './store/authReducer';
import AdminNavigator from './ViewAdmin/AdminNavigator';
import ProfileScreen from './ViewCommon/ProfileScreen';
import UserNavigator from './ViewUser/UserNavigator';

// Dummy screens
export const HomeScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}



// Simulate authentication state (replace with real logic)
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    return { isLoggedIn, setIsLoggedIn };
};

const AuthStack = createNativeStackNavigator();
export const AppStack = createNativeStackNavigator({
    screens: {
        Home: HomeScreen,
        AddEditProduct: ProfileScreen
    }
});

function AuthNavigator(authProps: any) {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                options={{
                    headerShown: false,
                }}
                name="Login"

                children={(props) => (
                    <LoginScreen
                        {...props}
                        onLoginSuccess={(result: any) => {
                            authProps.onLoginSuccess(result);
                        }}
                    />
                )}
            />
        </AuthStack.Navigator>
    );
}





function DeliveryNavigator() {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="DeliveryHome" component={HomeScreen} />
            {/* Add other delivery screens here */}
        </AppStack.Navigator>
    );
}

export default function App() {
    useEffect(() => {
        const { getItem } = useAsyncStorage(`${new Date().getUTCDate()}-auth`);
        getItem().then((value) => {
            if (value) {
                const authData = JSON.parse(value);
                dispatch(onLogin({ ...authData }));
            } else {
                console.log('No auth data found in storage');
            }
        });
    }, []);
    const userType = useSelector(selectAuth)?.userType;
    const dispatch = useDispatch();

    return (
        <>
            {(userType != undefined) ? (
                userType === 0 ? (
                    <UserNavigator />
                ) : (
                    userType === 1 ? (
                        <DeliveryNavigator />
                    ) : (
                        userType === 2 ? (
                            <AdminNavigator />
                        ) : (
                            <></>
                        )
                    )
                )) : (
                <AuthNavigator
                    onLoginSuccess={(result) => {
                        // Dispatch login action to Redux store using useDispatch
                        dispatch(onLogin({ token: result.token, ...result.user }));
                    }}
                />
            )}
        </>
    );
}