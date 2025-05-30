import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker'; // Ensure you have expo-image-picker installed
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { getCurrentUserProfile, updateUserProfile } from '../api/loginApi';
import { constants } from '../constants/constants';
import { onLogin } from '../store/authReducer';


export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4, width: 400, flex: 1 }}>{label}</Text>
        {children}
    </View>
);

const Stack = createNativeStackNavigator();

const EditProfileScreen = (props) => {
    const [userData, setUserData] = React.useState<any>(null);
    useEffect(() => {

        const fetchData = async () => {
            var userData = await getCurrentUserProfile();
            setUserData(userData);
        };
        fetchData();

    }, []);
    if (!userData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleChange = (field: string, value: string) => {
        setUserData((prev: any) => ({ ...prev, [field]: value }));
    };
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
        >
            <Field label="First name">
                <TextInput
                    style={styles.input}
                    placeholder="Product name"
                    value={userData.firstName}
                    onChangeText={text => handleChange('firstName', text)}
                    returnKeyType="next"
                />
            </Field>
            <Field label="Last name">
                <TextInput
                    style={styles.input}
                    placeholder="Product name"
                    value={userData.lastName}
                    onChangeText={text => handleChange('lastName', text)}
                    returnKeyType="next"
                />
            </Field>
            <Field label="Image">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Image
                        source={
                            userData.image
                                ? { uri: `data:image/png;base64,${userData.image}` }
                                : { uri: constants.NO_PROFILE_IMAGE_URL }
                        }
                        style={{ width: 170, height: 170, borderRadius: 20, margin: 20 }}
                    />
                    <Button
                        title={userData.image ? "Change Image" : "Upload Image"}
                        onPress={async () => {
                            const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
                            if (!result.canceled) {
                                const base64image = result.assets[0].base64;
                                if (base64image) {
                                    handleChange('image', base64image);
                                }
                            }
                        }}
                    />
                </View>
            </Field>
            <View style={{ flex: 1 }} />
            <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center', zIndex: 10 }}>
                <Button
                    title="Save"
                    onPress={async () => {
                        // TODO: Implement save logic, e.g., call an API to update the profile
                        // Example: await updateUserProfile(userData);
                        // For now, just log the data
                        console.log('Saving user data:', userData);
                        const updatedUserData = {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            image: userData.image,
                        };
                        const saved = await updateUserProfile(updatedUserData);
                        props.navigation.goBack();
                    }}
                    buttonStyle={{
                        backgroundColor: '#2089dc',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        minWidth: 120,
                        elevation: 4,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
});


export const ProfileMainNavigator = () => (
    <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Edit Profile' }}
        />
    </Stack.Navigator>
);

const ProfileScreen: React.FC = (props) => {
    const isFocused = useIsFocused();
    const [userData, setUserData] = React.useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            var userData = await getCurrentUserProfile();
            setUserData(userData);
        };
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);
    if (!userData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <>
            <ProfileDetails userData={userData} navigation={props.navigation} />
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ width: '60%', padding: 10, maxWidth: 200 }}>
                    <Button
                        title={'Logout'}
                        onPress={() => {
                            dispatch(onLogin({}));
                        }}
                        color={'red'}
                    />
                </View>
            </View>
        </>
    );
};

const ProfileDetails: React.FC<{ userData: any, navigation: any }> = ({ userData, navigation }) => {
    const handleEditProfile = (navigation) => {
        // Implement navigation or modal for editing profile here
        // For now, just log to console
        navigation.navigate('EditProfile');
        console.log('Edit Profile pressed');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
            <Image
                source={
                    userData.image
                        ? { uri: `data:image/png;base64,${userData.image}` }
                        : { uri: constants.NO_PROFILE_IMAGE_URL }
                }
                style={{ width: 200, height: 200, borderRadius: 20, margin: 20 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{`Name: ${userData.firstName + " " + userData.lastName}`}</Text>
            <Text style={{ color: '#666', marginBottom: 10 }}>{`Email: ${userData.email}`}</Text>
            <Button
                title="Edit Profile"
                onPress={() => handleEditProfile(navigation)}
                buttonStyle={{
                    backgroundColor: '#2089dc',
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    marginTop: 15,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                icon={{
                    name: 'edit',
                    type: 'feather',
                    color: 'white',
                    size: 20,
                }}
                iconRight
            />
        </View>
    );
};



export default ProfileScreen;