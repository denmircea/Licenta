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