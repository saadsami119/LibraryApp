using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Core.Model
{
    [Table("Checkout")]

    public class Checkout
    {
        public Checkout()
        {
            CheckoutDetails = new List<CheckoutDetails>();    
        }

        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }


        public User User { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        public List<CheckoutDetails> CheckoutDetails { get; set; }

    }
}
