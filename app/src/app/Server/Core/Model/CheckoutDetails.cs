using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Core.Model
{
    public class CheckoutDetails
    {
        [Key]
        public int Id { get; set; }


        public int BookId { get; set; }
        
        [ForeignKey("BookId")]
        public Book Book { get; set; }


        public int CheckoutId { get; set; }

        [ForeignKey("CheckoutId")]
        public Checkout Checkout { get; set; }

    }
}