import React, { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { login } from "../api/loginApi";

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
        <View style={{ flex: 1, backgroundColor: '#A7C7E7' }}>
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={60}
            >

                <View style={{
                    width: '90%',
                    maxWidth: 400,
                    padding: 24,
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    elevation: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                    <Icon
                        name="fastfood"
                        type="material"
                        color="#007AFF"
                        size={40}
                        style={{ lineHeight: 24, marginTop: 5 }}
                    ></Icon>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 24,
                        color: '#007AFF',
                        textAlign: 'center',
                        fontFamily: 'Cochin',
                    }}>

                        DeliveRO
                    </Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{
                            marginBottom: 16,
                            paddingVertical: 14,
                            paddingHorizontal: 18,
                            width: '100%',
                            borderWidth: 2,
                            borderColor: '#007AFF',
                            borderRadius: 32,
                            fontSize: 16,
                            backgroundColor: '#f2f2f2',
                        }}
                        editable={!loading}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={{
                            marginBottom: 16,
                            paddingVertical: 14,
                            paddingHorizontal: 18,
                            width: '100%',
                            borderWidth: 2,
                            borderColor: '#007AFF',
                            borderRadius: 32,
                            fontSize: 16,
                            backgroundColor: '#f2f2f2',
                        }}
                        secureTextEntry
                        editable={!loading}
                    />
                    <Button
                        title={loading ? 'Logging in...' : 'Login'}
                        onPress={handleLogin}
                        disabled={loading}
                        color="#007AFF"
                    />
                    {error && (
                        <Text style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</Text>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default LoginScreen;