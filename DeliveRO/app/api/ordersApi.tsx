import * as apiUtils from './apiUtils';


export async function placeOrder(data) {
    try {
        debugger;
        const response = await apiUtils.postCall(
            data,
            '/Order/PlaceOrder'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function retrieveUserOrders() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Order/RetrieveUserOrders'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function retrieveOrderDetails(orderId) {
    try {
        const response = await apiUtils.getCall(
            { orderId: orderId },
            `/Order/RetrieveOrderByID`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}