using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

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
    
        [Column(TypeName = "decimal(18,8)")]
        public decimal? Latitude { get; set; } = null;
        [Column(TypeName = "decimal(18,8)")]
        public decimal? Longitude { get; set; } = null;

        [InverseProperty("Order")]
        public virtual List<OrderItem> OrderItems { get; set; }
        public virtual User User { get; set; }
        public virtual User? DeliveryUser { get; set; }
    }
}
