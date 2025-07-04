export const constants = {
    BASEAPIURL: 'https://9d25-86-120-52-229.ngrok-free.app/api',
    emptyGuid: '00000000-0000-0000-0000-000000000000',
    currency: 'RON',
    NO_IMAGE_URL: 'https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg',
    NO_PROFILE_IMAGE_URL: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    OrderStatus: {
        0: 'Pending',
        100: 'Delivery In Progress',
        200: 'Delivered',
        300: 'Cancelled',
    },
    OrderStatusNames: {
        'Pending': 0,
        'Delivery In Progress': 100,
        'Delivered': 200,
        'Cancelled': 300,
    }
};

export default constants;