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