using System.Collections.Generic;
using app.Server.Core.Model;
using app.Server.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Core.Repository
{
    public class AppDbContext : DbContext, IDatabaseContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./library.db");
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Checkout> Checkouts { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Mapping Many To Many b/w Books & Authors
            modelBuilder.Entity<BooksAuthors>()
            .HasKey(compositeKey => new { compositeKey.BookId, compositeKey.AuthorId });
        }

        public void CreateDatabase()
        {
            Database.EnsureDeleted();
            Database.Migrate();
            Seed();
        }

        private void Seed()
        {
            var book = new Book { Name = "Treasure Island" };
            var author = new Author { Name = "Robert Louis Stevenson" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "Gulliver's Travels" };
            author = new Author { Name = "Jonathan Swift" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "The Odyssey" };
            author = new Author { Name = "Homer" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "King Solomon's Mines" };
            author = new Author { Name = "H. Rider Haggard" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);


            book = new Book { Name = "Into the Wild" };
            author = new Author { Name = "Jon Krakauer" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);


            book = new Book { Name = "Breakfast at Tiffany's" };
            author = new Author { Name = "Truman Capote" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "The Devil Wears Prada" };
            author = new Author { Name = "Lauren Weisberger" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "Jurassic Park" };
            author = new Author { Name = "Michael Crichton" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "The Lord of the Rings: The Fellowship of the Ring" };
            author = new Author { Name = "JRR Tolkien" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "Charlie and the Chocolate Factory" };
            author = new Author { Name = "Roald Dahl" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "Alice in Wonderland " };
            author = new Author { Name = "Lewis Carroll" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "The Wizard of Oz" };
            author = new Author { Name = "L. Frank Baum" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "The Hunger Games" };
            author = new Author { Name = "Suzanne Collins" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "The Hunger Games: Catching Fire" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "Harry Potter and the Sorcerer's Stone" };
            author = new Author { Name = "J. K. Rowling" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            book = new Book { Name = "Harry Potter and the Philosopher's Stone" };
            book.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author, Book = book } };
            Books.Add(book);

            var user = new User();
            user.Name = "saad@gmail.com";
            user.Password = "saad";
            Users.Add(user);

            SaveChanges();
        }
    }
}