namespace Backend.Utils
{
    public class CoreEnums
    {
        public enum UserType
        {
            User = 0,
            Delivery = 1,
            BackOfficeAdmin = 2,
        }
        public static class UserTypeNames
        {
            public const string User = "User";
            public const string Delivery = "Delivery";
            public const string BackOfficeAdmin = "BackOfficeAdmin";
        }
    }
}
