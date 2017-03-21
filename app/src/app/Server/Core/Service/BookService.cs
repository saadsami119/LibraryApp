using System.Collections.Generic;
using System.Linq;
using app.Server.Core.Model;
using app.Server.Infrastructure.Repository;
using app.Server.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Core.Service
{
    public class BookService : IBookService
    {
        private readonly IRepository<Book> _bookRepository;
        
        public BookService(IUnitOfWork uow)
        {
           _bookRepository = uow.BookRepository;
        }

        public IEnumerable<Book> GetBooks(string name = "", string author = "")
        {
            IEnumerable<Book> result = _bookRepository.Get().Include(x=>x.BooksAuthors).ThenInclude(x=>x.Author);

            if (!string.IsNullOrEmpty(name))
            {
                result = result.Where(x => x.Name.ToLower().Contains(name.ToLower()));
            }
            
            if (!string.IsNullOrEmpty(author))
            {
                result = result.Where(x => x.BooksAuthors.Any(ba => ba.Author.Name.ToLower().Contains(author.ToLower())));
            }

            return result;
        }
    }
}