using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Backend.Utils;
using Backend.Wrappers.Login;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Services
{
    public class AccountServices: BaseServices, IAccountServices
    {
        private readonly ApiOptions _appSettings;
        public AccountServices(ApplicationDbContext context, IOptions<ApiOptions> appSettings) : base(context)
        {
            _appSettings = appSettings.Value;
        }

        public User Login(string username, string password)
        {
            var user = Context.Users.Where(f => f.Email == username).FirstOrDefault();
            if(user == null)
            {
                return null;
            }

            var passwordSHA256 = GetUserPasswordHash(password); 
            if(passwordSHA256 != user.Password)
            {
                return null;
            }

            return user;
        }

        private string GetUserPasswordHash(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                var sb = new StringBuilder();
                foreach (var b in hash)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }

        private string GetRoleAuthorizationName(int? role)
        {
            CoreEnums.UserType userType = (CoreEnums.UserType)(role ?? 0);
            return userType.ToString();
        }

        public string GenerateAccessToken(User user)
        {
            if(user == null)
            {
                return null;
            }

            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("ID", user.ID.ToString() ?? ""),
                    new Claim("Name", user.FirstName + " " + user.LastName ?? ""),
                    new Claim(ClaimTypes.Role, GetRoleAuthorizationName(user.UserType)),
                }),
                Expires = DateTime.UtcNow.AddHours(_appSettings.HoursUntilExpiration + 1000000  ),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        public User RetrieveUserProfile(Guid userID)
        {
            return Context.Users.AsNoTracking().Where(f => f.ID == userID).FirstOrDefault();
        }

        public bool UpdateUserProfile(UpdateUserProfileRequest request, Guid userID)
        {
            var user = Context.Users.Where(f => f.ID == userID).FirstOrDefault();
            if (user == null)
            {
                return false;
            }
            if (!string.IsNullOrEmpty(request.FirstName))
            {
                user.FirstName = request.FirstName;
            }
            if (!string.IsNullOrEmpty(request.LastName))
            {
                user.LastName = request.LastName;
            }
            if (!string.IsNullOrEmpty(request.Image))
            {
                user.Image = ImageUtils.ResizeImage(request.Image, 300, 300);
            }
            return Context.SaveChanges()>0;
        }

        public Task<bool> LogLoginAnalytics(LoginAnalytics loginAnalytics)
        {
            Context.LoginAnalytics.Add(loginAnalytics);
            return Task.FromResult(Context.SaveChanges() > 0);
        }

        public bool SignUp(SignUpRequest request)
        {
            User user = new User
            {
                ID = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Password = GetUserPasswordHash(request.Password),
                UserType = (int)CoreEnums.UserType.User, 
                CreatedOn = DateTime.UtcNow,
                CreatedBy = request.FirstName + " " + request.LastName,
            };
            Context.Users.Add(user);
            return Context.SaveChanges() > 0;
        }

        public bool IsEmailRegistered(string email)
        {
            var user = Context.Users.AsNoTracking().FirstOrDefault(f => f.Email == email);
            return user != null;
        }
    }
}
