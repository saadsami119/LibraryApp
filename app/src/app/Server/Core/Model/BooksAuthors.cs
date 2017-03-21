using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Core.Model
{
    public class BooksAuthors
    {
        
        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public Book Book { get; set; }

        public int AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public Author Author { get; set; }
    }
}
