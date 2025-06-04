using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class LoginAnalytics
    {
        [Key]
        public Guid ID { get; set; }
        [ForeignKey(nameof(User))]
        public Guid UserID { get; set; }
        public DateTime Date { get; set; }
        public string IPAddress { get; set; } = string.Empty;
        public string UserAgent { get; set; } = string.Empty;

        public User User { get; set; }
    }
}
