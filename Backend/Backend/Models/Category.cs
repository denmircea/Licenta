namespace Backend.Models
{
    public class Category
    {
        public Guid ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public int SortIndex { get; set; } = 0;
    }
}
