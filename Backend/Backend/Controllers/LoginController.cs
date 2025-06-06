using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Backend.Services;
using Backend.Utils;
using Backend.Wrappers.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Controllers
{
    public class LoginController : BaseController
    {
        private readonly IAccountServices _accountServices;

        public LoginController(ApplicationDbContext context, IOptions<ApiOptions> options)
        {
            _accountServices = new AccountServices(context, options);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validate the request
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = _accountServices.Login(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }
            var loginAnalitics = new LoginAnalytics
            {
                ID = Guid.NewGuid(),
                UserID = user.ID,
                Date = DateTime.Now,
                IPAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "",
                UserAgent = Request.Headers["User-Agent"].ToString() ?? ""
            };
            _accountServices.LogLoginAnalytics(loginAnalitics);
            var bearerToken = _accountServices.GenerateAccessToken(user);
            return Ok(new { Token = bearerToken, User = user });
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult SignUp([FromBody] SignUpRequest request)
        {
            // Validate the request
            if (
                string.IsNullOrEmpty(request.FirstName)
                || string.IsNullOrEmpty(request.LastName)
                || string.IsNullOrEmpty(request.Email)
                || string.IsNullOrEmpty(request.PhoneNumber)
                || string.IsNullOrEmpty(request.Password)
                )
            {
                return BadRequest("All fields are mandatory.");
            }

            var isEmailUsed = _accountServices.IsEmailRegistered(request.Email);
            if (isEmailUsed)
            {
                return Unauthorized("Email already in use.");
            }
            var isSignUpSuccessful = _accountServices.SignUp(request);
            if (!isSignUpSuccessful)
            {
                return StatusCode(500, "An error occurred while signing up. Please try again later.");
            }
            return Ok("Sign up successful. You can now log in with your credentials.");
        }

        [Authorize(Roles = CoreEnums.UserTypeNames.BackOfficeAdmin)]
        [HttpGet]
        public IActionResult Get()
        {
            /// get the token from request
            var token = GetRequestUserID();
            return Ok("Login controller is working.");
        }

        [HttpGet]
        public IActionResult RetrieveUserProfile()
        {
            var userID = GetRequestUserID();
            return Ok(_accountServices.RetrieveUserProfile(userID));
        }

        [HttpPost]
        public IActionResult UpdateUserProfile([FromBody] UpdateUserProfileRequest request)
        {
            var userID = GetRequestUserID();
            if (userID == Guid.Empty)
            {
                return BadRequest("Invalid user ID.");
            }
            var result = _accountServices.UpdateUserProfile(request, userID);

            return Ok("User profile updated successfully.");
        }
    }
}
