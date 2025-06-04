namespace Backend.Wrappers
{
    public class DeliveryUserSalesData
    {
       public DeliveryUserSalesDataInterval LastDay { get; set; }
       public DeliveryUserSalesDataInterval LastWeek { get; set; }
       public DeliveryUserSalesDataInterval LastMonth { get; set; }
    }

    public class DeliveryUserSalesDataInterval
    {
        public int OrdersCount { get; set; }
        public decimal TotalSales { get; set; } 
    }
   
}
