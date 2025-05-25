import * as apiUtils from './apiUtils';

export async function retrieveCategories() {
    try {
        debugger;
        const response = await apiUtils.getCall(
            null,
            '/Category/GetCategories'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
