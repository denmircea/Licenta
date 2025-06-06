import * as apiUtils from './apiUtils';

export async function retrieveAdministrationAnalytics() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Analytics/GetAdministrationAnalytics'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getRecommendedProducts(productIds: string[]) {
    try {
        const response = await apiUtils.postCall(
            { productIds },
            '/Analytics/GetRecommendedProducts'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    retrieveAdministrationAnalytics,
    getRecommendedProducts,
}