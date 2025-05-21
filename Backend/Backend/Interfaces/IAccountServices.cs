using Backend.Models;

namespace Backend.Interfaces
{
    public interface IAccountServices
    {
        public User Login(string email, string password);
        public string GenerateAccessToken(User user);
    }
}
