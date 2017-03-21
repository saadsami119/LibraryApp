using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Core.Model
{
    [Table("User")]

    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }
    }
}
