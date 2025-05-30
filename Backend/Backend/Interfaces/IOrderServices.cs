using Backend.Models;
using Backend.Wrappers;

namespace Backend.Interfaces
{
    public interface IOrderServices
    {
        public bool PlaceOrder(PlaceOrderRequest request, Guid userID);
        public List<Order> RetrieveUserOrders(Guid guid);
        public Order RetrieveOrder(Guid orderId);
    }
}
