using System.Collections.Generic;
using app.Server.Core.Model;

namespace app.Server.Infrastructure.Service
{
    public interface ICheckoutService
    {
        void Checkout(IEnumerable<Book> books , string username);
    }
}