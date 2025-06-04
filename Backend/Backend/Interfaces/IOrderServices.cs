using Backend.Models;
using Backend.Wrappers;

namespace Backend.Interfaces
{
    public interface IOrderServices
    {
        public bool PlaceOrder(PlaceOrderRequest request, Guid userID);
        public List<Order> RetrieveUserOrders(Guid guid);
        public Order RetrieveOrder(Guid orderId);
        public List<Order> RetrieveDeliveryAvailableOrders();
        public void AssignOrderToDeliveryUser(Guid userId, Guid orderId);
        public Order RetrieveCurrentDeliveryOrder(Guid userId);
        public void ConfirmDeliveryOrder(Guid orderId);
        public List<Order> GetDeliveryUserOrdersHistory(Guid userId);
        public DeliveryUserSalesData GetDeliveryUserSalesData(Guid userId);

    }
}
