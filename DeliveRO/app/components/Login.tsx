import React, { useState } from "react";
import { Button, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { login } from "../api/loginApi";
const logo = require('../../assets/images/icon.png');

export const LoginScreen = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await login(email, password);
            // Here you would handle login logic
            // For example: await login(email, password);
            props.onLoginSuccess(result);
        } catch (e) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#EAF0F6' }}>
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={60}
            >
                <View
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    // Dismiss keyboard on tap outside (including swipe down gesture)
                    onStartShouldSetResponder={() => true}
                    onResponderRelease={() => {
                        // Dismiss keyboard on swipe/tap outside
                        if (Platform.OS !== 'web') {
                            // @ts-ignore
                            Keyboard.dismiss();
                        }
                    }}
                />
                <View style={{
                    width: '90%',
                    maxWidth: 380,
                    padding: 28,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    shadowColor: '#007AFF',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.28,
                    shadowRadius: 24,
                    elevation: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={logo}
                        style={{
                            width: 100,
                            height: 100,
                            // borderRadius: 36,
                            marginBottom: 25,
                            // backgroundColor: '#E3F0FF',
                        }}
                        resizeMode="contain"
                    />
                  
                    <View style={{
                        width: '100%',
                        marginBottom: 18,
                        backgroundColor: '#F7FAFC',
                        borderRadius: 16,
                        borderWidth: 1.5,
                        borderColor: '#D1E3F8',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 14,
                        shadowColor: '#007AFF',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 2,
                    }}>
                        <Icon name="email" type="material" color="#A7C7E7" size={22} />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={{
                                flex: 1,
                                paddingVertical: 14,
                                paddingHorizontal: 12,
                                fontSize: 16,
                                color: '#222',
                                backgroundColor: 'transparent',
                            }}
                            editable={!loading}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#A7C7E7"
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        marginBottom: 22,
                        backgroundColor: '#F7FAFC',
                        borderRadius: 16,
                        borderWidth: 1.5,
                        borderColor: '#D1E3F8',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 14,
                        shadowColor: '#007AFF',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 2,
                    }}>
                        <Icon name="lock" type="material" color="#A7C7E7" size={22} />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={{
                                flex: 1,
                                paddingVertical: 14,
                                paddingHorizontal: 12,
                                fontSize: 16,
                                color: '#222',
                                backgroundColor: 'transparent',
                            }}

                            secureTextEntry
                            editable={!loading}
                            placeholderTextColor="#A7C7E7"
                            onSubmitEditing={handleLogin}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        marginTop: 6,
                        marginBottom: 8,
                        borderRadius: 16,
                        overflow: 'hidden',
                        shadowColor: '#007AFF',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.13,
                        shadowRadius: 8,
                        elevation: 4,
                        backgroundColor: '#007AFF', // Added background color for iOS
                    }}>
                        <Button
                            title={loading ? 'Logging in...' : 'Login'}
                            onPress={handleLogin}
                            disabled={loading}
                            color={Platform.OS === 'ios' ? '#fff' : '#007AFF'} // White text on iOS
                        />
                    </View>
                    {error && (
                        <Text style={{
                            color: '#D7263D',
                            marginTop: 14,
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: 15,
                        }}>{error}</Text>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default LoginScreen;