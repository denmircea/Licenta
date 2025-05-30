using Backend.Data;
using Backend.Interfaces;
using Backend.Services;
using Backend.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class OrderController: BaseController
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
    }
}
