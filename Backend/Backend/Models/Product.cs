using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Product
    {
        public Guid ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [ForeignKey(nameof(Category))]
        public Guid? CategoryID { get; set; }
        public string Image { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
        public int Stock { get; set; } = 0;
        public virtual Category? Category { get; set; }
    }
}
