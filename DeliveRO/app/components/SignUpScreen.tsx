import React, { useState } from "react";
import { Button, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { login, signUp } from "../api/loginApi";
const logo = require('../../assets/images/icon.png');

const SignUpScreen = (props: any) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollViewRef = React.useRef<ScrollView>(null);

    const handleSignUp = async () => {
        Keyboard.dismiss();
        setLoading(true);
        setError(null);
        try {
            // Replace with your sign-up logic/API call
            await signUp({ firstName, lastName, email, password, phoneNumber });
            const resultLogin = await login(email, password);
            props.onLoginSuccess(resultLogin);
            props.navigation.goBack();
        } catch (e) {
            setError('Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#EAF0F6' }}>
            <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={60}
            >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                keyboardShouldPersistTaps="handled"
                onScrollBeginDrag={Keyboard.dismiss}
                ref={scrollViewRef}
            >
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
                    marginBottom: 25,
                    }}
                    resizeMode="contain"
                />

                {/* First Name */}
                <View style={{
                    width: '100%',
                    marginBottom: 14,
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
                    <Icon name="person" type="material" color="#A7C7E7" size={22} />
                    <TextInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 12,
                        fontSize: 16,
                        color: '#222',
                        backgroundColor: 'transparent',
                    }}
                    editable={!loading}
                    autoCapitalize="words"
                    placeholderTextColor="#A7C7E7"
                    returnKeyType="next"
                    />
                </View>

                {/* Last Name */}
                <View style={{
                    width: '100%',
                    marginBottom: 14,
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
                    <Icon name="person-outline" type="material" color="#A7C7E7" size={22} />
                    <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    style={{
                        flex: 1,
                        paddingVertical: 14,
                        paddingHorizontal: 12,
                        fontSize: 16,
                        color: '#222',
                        backgroundColor: 'transparent',
                    }}
                    editable={!loading}
                    autoCapitalize="words"
                    placeholderTextColor="#A7C7E7"
                    returnKeyType="next"
                    />
                </View>

                {/* Email */}
                <View style={{
                    width: '100%',
                    marginBottom: 14,
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
                    returnKeyType="next"
                    />
                </View>

                {/* Password */}
                <View style={{
                    width: '100%',
                    marginBottom: 14,
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
                    returnKeyType="next"
                    />
                </View>

                {/* Phone Number */}
                <View
                    style={{
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
                    }}
                >
                    <Icon name="phone" type="material" color="#A7C7E7" size={22} />
                    <TextInput
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={{
                            flex: 1,
                            paddingVertical: 14,
                            paddingHorizontal: 12,
                            fontSize: 16,
                            color: '#222',
                            backgroundColor: 'transparent',
                        }}
                        editable={!loading}
                        keyboardType="phone-pad"
                        placeholderTextColor="#A7C7E7"
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={Keyboard.dismiss}
                        onFocus={() => {
                            setTimeout(() => {
                                // Scroll to the bottom when phone input is focused
                                if (scrollViewRef?.current) {
                                    scrollViewRef.current.scrollToEnd({ animated: true });
                                }
                            }, 300);
                        }}
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
                    backgroundColor: '#007AFF',
                }}>
                    <Button
                    title={loading ? 'Signing up...' : 'Sign Up'}
                    onPress={handleSignUp}
                    disabled={loading}
                    color={Platform.OS === 'ios' ? '#fff' : '#007AFF'}
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
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 18 }}>
                    <Text
                    style={{
                        color: '#007AFF',
                        fontWeight: '500',
                        fontSize: 15,
                        textAlign: 'right',
                        padding: 6,
                    }}
                    onPress={() => props.navigation.goBack()}
                    >
                    Already have an account?
                    </Text>
                </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignUpScreen;