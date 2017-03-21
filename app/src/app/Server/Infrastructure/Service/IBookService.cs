using System.Collections.Generic;
using app.Server.Core.Model;

namespace app.Server.Infrastructure.Service
{
    public interface IBookService
    {
        IEnumerable<Book> GetBooks(string name = "", string author = "");
    }
}