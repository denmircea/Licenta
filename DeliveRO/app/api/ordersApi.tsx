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

export async function retrieveDeliveryAvailableOrders() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Order/RetrieveDeliveryAvailableOrders'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function assignOrderToDeliveryUser(orderId: string) {
    try {
        const response = await apiUtils.postCall(
            { orderId: orderId },
            '/Order/AssignOrderToDeliveryUser'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function retrieveOrderDetails(orderId: string) {
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

export async function retrieveCurrentDeliveryOrder() {
    try {
        const response = await apiUtils.getCall(
            null,
            '/Order/RetrieveCurrentDeliveryOrder'
        );
        if (response.data)
            return response.data;
        return null;
    } catch (error) {
        throw error;
    }
}

export async function confirmDeliveryOrder(orderId: string) {
    try {
        const response = await apiUtils.postCall(
            { orderId: orderId },
            '/Order/ConfirmDeliveryOrder'
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}