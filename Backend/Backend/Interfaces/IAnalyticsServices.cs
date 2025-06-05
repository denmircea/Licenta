using Backend.Models;
using Backend.Services;

namespace Backend.Interfaces
{
    public interface IAnalyticsServices
    {
        public AnalyticsResponse GetAllAnalytics(int days = 2);
        public List<Product> GetRecommendedProducts(List<Guid> productIDs);
    }
}
