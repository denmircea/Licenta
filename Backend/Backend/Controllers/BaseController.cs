using Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class BaseController: ControllerBase
    {

        protected Guid GetRequestUserID()
        {
            var data = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "ID")?.Value;
            if(data == null)
            {
                return Guid.Empty;
            }
            return new Guid(data);
        }
        protected CoreEnums.UserType GetRequestUserType()
        {
            var data = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            if(data == null)
            {
                return CoreEnums.UserType.User;
            }
            var result = Enum.TryParse(data, out CoreEnums.UserType userType);
            if (result)
            {
                return userType;
            }
            return CoreEnums.UserType.User;
        }
    }
}
