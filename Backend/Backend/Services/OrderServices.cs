using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Backend.Utils;
using Backend.Wrappers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class OrderServices: BaseServices, IOrderServices
    {
        public OrderServices(ApplicationDbContext context) : base(context)
        {
        }

        public bool PlaceOrder(PlaceOrderRequest request, Guid userID)
        {
            List<OrderItem> orderItems = new List<OrderItem>();
            decimal total = 0;
            foreach (var item in request.Cart)
            {
                var orderItem = new OrderItem
                {
                    ProductID = item.ID,
                    Quantity = item.Quantity,
                    Price = item.Price
                };
                total += item.Price * item.Quantity;
                orderItems.Add(orderItem);
            }
            Order order = new Order
            {
                ID = new Guid(),
                UserID = userID,
                CreatedOn = DateTime.UtcNow,
                OrderItems = orderItems,
                Status = 0,
                Total = total,
                Address = request.AddressData.Address,
            };
            Context.Orders.Add(order);
            return Context.SaveChanges() > 0;
        }

        public List<Order> RetrieveUserOrders(Guid guid)
        {
            return Context.Orders
                .AsNoTracking()
                .Where(o => o.UserID == guid)
                .OrderByDescending(o => o.CreatedOn)
                .ToList();
        }

        public Order RetrieveOrder(Guid orderId)
        {
            var result = Context.Orders
                .Include(o=> o.User)
                .Include(o=> o.DeliveryUser)
                .Include(o => o.OrderItems)
                .ThenInclude(o => o.Product)
                .AsNoTracking()
                .Where(f => f.ID == orderId)
                .FirstOrDefault();
            result.OrderItems.ForEach(f => f.Order = null);
            return result ?? new Order();
        }

        public List<Order> RetrieveDeliveryAvailableOrders()
        {
            var orders = Context.Orders
                .Include(o => o.User)
                .Where(o => o.DeliveryUserID == null && o.Status == (int)CoreEnums.OrderStatus.Pending)
                .ToList();
            return orders.ToList();
        }

        public void AssignOrderToDeliveryUser(Guid userId, Guid orderId)
        {
            var order = Context.Orders.Where(f => f.ID == orderId).FirstOrDefault();
            if(order != null && order.DeliveryUserID == null)
            {
                order.DeliveryUserID = userId;
                order.Status = (int)CoreEnums.OrderStatus.DeliveryInProgress;
            }
            Context.SaveChanges();
            return;
        }

        public Order RetrieveCurrentDeliveryOrder(Guid userId)
        {
            return Context.Orders.Where(f => f.DeliveryUserID == userId && f.Status == (int)CoreEnums.OrderStatus.DeliveryInProgress).FirstOrDefault();
        }

        public void ConfirmDeliveryOrder(Guid orderId)
        {

            var order = Context.Orders.Where(f => f.ID == orderId).FirstOrDefault();
            order.Status = (int)CoreEnums.OrderStatus.Delivered;
            Context.SaveChanges();
        }
    }
}
