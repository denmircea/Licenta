import * as apiUtils from './apiUtils';

export async function retrieveAllProducts() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Product/GetAllProducts'
            
        );
        console.log(response, response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
