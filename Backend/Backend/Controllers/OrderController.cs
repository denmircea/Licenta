using Backend.Data;
using Backend.Interfaces;
using Backend.Services;
using Backend.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class AssignOrderToDeliveryUserRequest
    {
        public Guid OrderId { get; set; }
    }
    public class OrderController : BaseController
    {
        private readonly IOrderServices _orderServices;
        public OrderController(ApplicationDbContext context)
        {
            _orderServices = new OrderServices(context);
        }

        [HttpPost]
        public IActionResult PlaceOrder([FromBody] PlaceOrderRequest request)
        {
            return Ok(_orderServices.PlaceOrder(request, GetRequestUserID()));
        }

        [HttpGet]
        public IActionResult RetrieveUserOrders()
        {
            return Ok(_orderServices.RetrieveUserOrders(GetRequestUserID()));
        }

        [HttpGet]
        public IActionResult RetrieveOrderByID(Guid orderID)
        {
            var order = _orderServices.RetrieveOrder(orderID);
            if (order == null)
            {
                return NotFound("Order not found.");
            }
            return Ok(order);
        }
        [HttpGet]
        public IActionResult RetrieveDeliveryAvailableOrders()
        {
            var availableOrders = _orderServices.RetrieveDeliveryAvailableOrders();
            return Ok(availableOrders);
        }
        [HttpPost]
        public IActionResult AssignOrderToDeliveryUser([FromBody] AssignOrderToDeliveryUserRequest request)
        {
            _orderServices.AssignOrderToDeliveryUser(GetRequestUserID(), request.OrderId);
            return Ok(true);
        }
        [HttpGet]
        public IActionResult RetrieveCurrentDeliveryOrder()
        {
            var deliveryUserID = GetRequestUserID();
            var order = _orderServices.RetrieveCurrentDeliveryOrder(deliveryUserID);
            if (order == null)
            {
                return Ok(false);
            }
            return Ok(order);
        }
        [HttpPost]
        public IActionResult ConfirmDeliveryOrder([FromBody] AssignOrderToDeliveryUserRequest request)
        {
            _orderServices.ConfirmDeliveryOrder(request.OrderId);
            return Ok(true);
        }

        [HttpGet]
        public IActionResult GetDeliveryUserOrdersHistory()
        {
            var data = _orderServices.GetDeliveryUserOrdersHistory(GetRequestUserID());
            return Ok(data);
        }
        [HttpGet]
        public IActionResult GetDeliveryUserSalesData()
        {
            var data = _orderServices.GetDeliveryUserSalesData(GetRequestUserID());
            return Ok(data);
        }
    }
}
