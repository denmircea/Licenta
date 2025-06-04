using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ChartData
    {
        public DateTime Date { get; set; }
        public decimal Value { get; set; }
    }
    public class BarChartData
    {
        public string Label { get; set; }
        public decimal Value { get; set; }
    }
    public class AnalyticsResponse
    {
        public Dictionary<int, List<ChartData>> LoginData { get; set; } = new Dictionary<int, List<ChartData>>();
        public List<ChartData> SalesData { get; set; } = new List<ChartData>();
        public List<BarChartData> CategorySales { get; set; } = new List<BarChartData>();
        public List<BarChartData> TopDeliveryUsers { get; set; } = new List<BarChartData>();

    }
    public class AnalyticsServices : BaseServices, IAnalyticsServices
    {
        public AnalyticsServices(ApplicationDbContext context) : base(context)
        {
        }

        public AnalyticsResponse GetAllAnalytics(int days = 7)
        {
            var result = new AnalyticsResponse();
            var loginAnalytics = Context.LoginAnalytics.Where(c=>c.Date.Date.AddDays(days) >= DateTime.Now.Date).Include(c => c.User).GroupBy(f => (f.User.UserType)).ToDictionary(f => f.Key, f =>
            {
                return f.GroupBy(g => g.Date.Date).Select(g => new ChartData
                {
                    Date = g.Key,
                    Value = g.Count()
                }).ToList();
            });
            result.LoginData = loginAnalytics;
            var salesData = Context.Orders.Where(c=> c.CreatedOn.Date.AddDays(days) >= DateTime.Now.Date).GroupBy(f => f.CreatedOn.Date).Select(g => new ChartData
            {
                Date = g.Key,
                Value = g.Sum(s => s.Total)
            }).ToList();
            result.SalesData = salesData;

            var categorySales = Context.OrderItems.Where(c => c.Order.CreatedOn.AddDays(days) >= DateTime.Now.Date).GroupBy(f => f.Product.CategoryID);
            var categorySalesData = categorySales.Select(g => new BarChartData
            {
                Label = Context.Categories.Where(c => c.ID == g.Key).Select(c => c.Name).FirstOrDefault() ?? "Unknown",
                Value = g.Sum(s => s.Quantity * s.Price)
            }).ToList();
            result.CategorySales = categorySalesData;

            var topDeliveryUsers = Context.Orders.Where(c => c.CreatedOn.Date.AddDays(days) >= DateTime.Now.Date && c.DeliveryUserID.HasValue).GroupBy(f => f.DeliveryUserID);
            var topDeliveryUsersSalesData = topDeliveryUsers.Select(g => new BarChartData
            {
                Label = Context.Users.Where(c => c.ID == g.Key).Select(c => c.FirstName + " " + c.LastName).FirstOrDefault() ?? "Unknown",
                Value = g.Sum(s => s.Total)
            }).OrderByDescending(f => f.Value).Take(3).ToList();
            result.TopDeliveryUsers = topDeliveryUsersSalesData;
            return result;
        }
    }
}
