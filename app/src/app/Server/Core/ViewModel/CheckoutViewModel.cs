using System.Collections.Generic;
using app.Server.Core.Model;

namespace app.Server.Core.ViewModel
{
    public class CheckoutViewModel
    {
        public string UserId { get; set; }
        public IEnumerable<Book> Books { get; set; }
    }
}
