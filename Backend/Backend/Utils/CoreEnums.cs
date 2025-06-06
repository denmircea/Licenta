namespace Backend.Utils
{
    public class CoreEnums
    {
        public enum UserType
        {
            User = 0,
            Delivery = 1,
            BackOfficeAdmin = 2,
            UnconfirmedUser = 3,
        }
        public static class UserTypeNames
        {
            public const string User = "User";
            public const string Delivery = "Delivery";
            public const string BackOfficeAdmin = "BackOfficeAdmin";
        }
        public enum OrderStatus
        {
            Pending = 0,
            DeliveryInProgress = 100,
            Delivered = 200,
            Cancelled = 300
        }
    }
}
