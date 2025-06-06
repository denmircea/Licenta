import constants from '../constants/constants';
import * as apiUtils from './apiUtils';

export async function retrieveAllProducts() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Product/GetAllProducts'

        );
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function saveProduct(product: any) {
    try {
        const response = await apiUtils.postCall(
            { ...product, id: product.id || constants.emptyGuid, category: null },
            '/Product/SaveProduct'
        );
        if (product.id) {
            return product;
        }
        else {
            return {
                ...product,
                id: response.data
            };
        }
    } catch (error) {
        throw error;
    }
}

export default {
    retrieveAllProducts,
    saveProduct,
};
