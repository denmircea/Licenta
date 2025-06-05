using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Backend.Services;
using Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class AnalyticsController : BaseController
    {
        private readonly IAnalyticsServices _analyticsServices;
        public AnalyticsController(ApplicationDbContext context)
        {
            _analyticsServices = new AnalyticsServices(context);
        }

        [HttpGet]
        [Authorize(Roles = CoreEnums.UserTypeNames.BackOfficeAdmin)]
        public IActionResult GetAdministrationAnalytics()
        {
            var analytics = _analyticsServices.GetAllAnalytics();
            return Ok(analytics);
        }

        public class RecommendedProductsRequest
        {
            public List<Guid> ProductIds { get; set; }
        }

        [HttpPost]
        public IActionResult GetRecommendedProducts([FromBody] RecommendedProductsRequest request)
        {
            if (request.ProductIds == null || request.ProductIds.Count == 0)
            {
                return BadRequest("Product IDs cannot be null or empty.");
            }
            var userType = GetRequestUserType();
            if (userType != CoreEnums.UserType.User && userType != CoreEnums.UserType.Delivery)
            {
                return Forbid("Only users and delivery personnel can request recommended products.");
            }
            var recommendedProducts = _analyticsServices.GetRecommendedProducts(request.ProductIds);
            return Ok(recommendedProducts);
        }
    }
}
