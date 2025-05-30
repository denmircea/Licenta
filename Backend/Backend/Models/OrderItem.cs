using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class OrderItem
    {
        [Key]
        public Guid ID { get; set; }
        public decimal Price { get; set; }

        [ForeignKey(nameof(Order))]
        public Guid OrderID { get; set; }

        [ForeignKey(nameof(Product))]
        public Guid ProductID { get; set; }

        public int Quantity { get; set; }

        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }
    }
}
