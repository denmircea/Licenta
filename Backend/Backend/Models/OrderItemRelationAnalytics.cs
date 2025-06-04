using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class OrderItemRelationAnalystics
    {
        [Key]
        public Guid ID { get; set; }

        [ForeignKey(nameof(Product1))]
        public Guid Product1ID { get; set; }

        [ForeignKey(nameof(Product2))]
        public Guid Product2ID { get; set; }
        public decimal EdgeValue { get; set; } = 0;

        public virtual Product Product1 { get; set; }
        public virtual Product Product2 { get; set; }
    }
}
