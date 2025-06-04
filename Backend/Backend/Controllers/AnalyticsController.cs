using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Backend.Services;
using Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class AnalyticsController: BaseController
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
    }
}
