import * as apiUtils from './apiUtils';



export async function login(username: string, password: string) {
    try {
        const response = await apiUtils.postCall(
            { username, password, },
            '/login/login'
        );
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}