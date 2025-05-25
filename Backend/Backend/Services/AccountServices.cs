using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Backend.Utils;
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
                Expires = DateTime.UtcNow.AddHours(_appSettings.HoursUntilExpiration),
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
    }
}
