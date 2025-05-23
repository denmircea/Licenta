import * as apiUtils from './apiUtils';



export async function retrieveCategories() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Category/GetCategories'
        );
        console.log(response, response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
