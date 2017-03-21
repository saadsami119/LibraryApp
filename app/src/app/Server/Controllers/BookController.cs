using System.Linq;
using app.Server.Core.Model;
using app.Server.Infrastructure.Service;
using Microsoft.AspNetCore.Mvc;

namespace app.Server.Controllers
{

    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

       [HttpGet("name/{name?}/author/{author?}")]
        public IActionResult GetBooks(string name = null, string author = null)
        {
            var searchedBooks = _bookService.GetBooks(name);

            var data = searchedBooks.Select(b => new { Id = b.Id, Name = b.Name, Author = b.BooksAuthors.Select(x => x.Author.Name) });

            var jsonResponse = new JsonResponse
            {
                Successful = true,
                Error = string.Empty,
                Data = data
            };

            return Json(jsonResponse);
        }

    }
}