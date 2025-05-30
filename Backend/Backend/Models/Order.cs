using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Order
    {
        [Key]
        public Guid ID { get; set; }
        [ForeignKey("User")]
        public Guid UserID { get; set; }
        [ForeignKey("DeliveryUser")]
        public Guid? DeliveryUserID { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public int Status { get; set; } = 0;

        [InverseProperty("Order")]
        public virtual List<OrderItem> OrderItems { get; set; }
        public virtual User User { get; set; }
        public virtual User? DeliveryUser { get; set; }
    }
}
