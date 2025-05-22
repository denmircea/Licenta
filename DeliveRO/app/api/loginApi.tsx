import * as apiUtils from './apiUtils';

export async function login(username: string, password: string) {
    try {
        console.log('Logging in with username:', username);
        const data = await apiUtils.postCall({
            username,
            password,
        }, '/login/login');
      

        return data.body;
    } catch (error) {
        throw error;
    }
}