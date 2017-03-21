using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Core.Model
{
    [Table("Authors")]
    public class Author
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public List<BooksAuthors> BooksAuthors { get; set; }
    }
}
