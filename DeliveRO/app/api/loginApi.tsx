import * as apiUtils from './apiUtils';



export async function login(username: string, password: string) {
    try {
        const response = await apiUtils.postCall(
            { username, password, },
            '/login/login'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function signUp(signUpData: any) {
    try {
        const response = await apiUtils.postCall(
            signUpData,
            '/login/SignUp'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getCurrentUserProfile() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/login/RetrieveUserProfile'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfile(data: any) {
    try {
        const response = await apiUtils.postCall(
            data,
            '/login/UpdateUserProfile'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    login,
    signUp,
    getCurrentUserProfile,
    updateUserProfile,
};