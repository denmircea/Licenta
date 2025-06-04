using Backend.Models;
using Backend.Services;

namespace Backend.Interfaces
{
    public interface IAnalyticsServices
    {
        public AnalyticsResponse GetAllAnalytics(int days =7);
    }
}
