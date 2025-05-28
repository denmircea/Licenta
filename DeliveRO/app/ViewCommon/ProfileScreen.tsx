import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { getCurrentUserProfile } from '../api/loginApi';
import { onLogin } from '../store/authReducer';

const PROFILE_IMAGE =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

const ProfileScreen: React.FC = () => {
    const [userData, setUserData] = React.useState<any>(null);
    const dispatch = useDispatch();

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

    return (
        <>
            <ProfileDetails userData={userData} />
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

const ProfileDetails: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
            <Image
                source={
                    userData.image
                        ? { uri: `data:image/png;base64,${userData.image}` }
                        : { uri: PROFILE_IMAGE }
                }
                style={{ width: 200, height: 200, borderRadius: 20, margin: 20 }}
            />
            <Text>{userData.firstName + " " + userData.lastName}</Text>
            <Text>{userData.email}</Text>
        </View>
    );
};



export default ProfileScreen;