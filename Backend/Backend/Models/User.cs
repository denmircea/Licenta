using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public Guid ID { get; set; }
        [Required]
        [StringLength(100)]
        public required string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public required string LastName { get; set; }
        [Required]
        [StringLength(100)]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        [StringLength(20)]
        public required string PhoneNumber { get; set; }
        [Required]
        public required string CreatedBy { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        [ForeignKey("UserType")]
        public int UserType { get; set; } = 0;
    }
}
