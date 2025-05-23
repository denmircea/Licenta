import { Text } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen } from './components/Login';
import { onLogin, selectAuth } from './store/authReducer';
import AdminNavigator from './ViewAdmin/AdminNavigator';

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
export const AppStack = createNativeStackNavigator();

function AuthNavigator(authProps: any) {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
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



function UserNavigator() {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="UserHome" component={HomeScreen} />
            {/* Add other user screens here */}
        </AppStack.Navigator>
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
                        console.log('Login successful22:', result);
                        dispatch(onLogin({ token: result.token, ...result.user }));
                    }}
                />
            )}
        </>
    );
}