using Backend.Models;
using Backend.Wrappers.Login;

namespace Backend.Interfaces
{
    public interface IAccountServices
    {
        public User Login(string email, string password);
        public bool SignUp(SignUpRequest request);
        public bool IsEmailRegistered(string email);
        public string GenerateAccessToken(User user);
        public User RetrieveUserProfile(Guid userID);
        public bool UpdateUserProfile(UpdateUserProfileRequest request, Guid userID);
        public Task<bool> LogLoginAnalytics(LoginAnalytics loginAnalytics);
    }
}
