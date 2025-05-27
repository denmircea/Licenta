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

export const guidEmpty = '00000000-0000-0000-0000-000000000000';

export async function saveProduct(product: any) {
    try {
        const response = await apiUtils.postCall(
            { ...product, id: product.id || guidEmpty },
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
