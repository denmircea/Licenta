namespace Backend.Data
{
    public class ApiOptions
    {
        public string Secret { get; set; }
        public int HoursUntilExpiration { get; set; }
        public string TemplateId { get; set; }
    }
}
