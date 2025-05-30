using Backend.Models;
using Backend.Wrappers.Login;

namespace Backend.Interfaces
{
    public interface IAccountServices
    {
        public User Login(string email, string password);
        public string GenerateAccessToken(User user);
        public User RetrieveUserProfile(Guid userID);
        public bool UpdateUserProfile(UpdateUserProfileRequest request, Guid userID);
    }
}
