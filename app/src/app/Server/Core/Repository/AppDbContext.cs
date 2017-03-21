using System.Collections.Generic;
using System.Linq;
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
            var author1 = new Author { Name = "A1" };
            var author2 = new Author { Name = "A2" };
            var author3 = new Author { Name = "A3" };
            var author4 = new Author { Name = "A4" };

            var book1 = new Book { Name = "B1" };
            book1.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author1, Book = book1 }, new BooksAuthors { Author = author2, Book = book1 } };
            Books.Add(book1);

            var book2 = new Book { Name = "B2" };
            book2.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author2, Book = book2 } };
            Books.Add(book2);

            var book3 = new Book { Name = "B3" };
            book3.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author3, Book = book3 } };
            Books.Add(book3);

            var book4 = new Book { Name = "B4" };
            book4.BooksAuthors = new List<BooksAuthors> { new BooksAuthors { Author = author4, Book = book4 } };
            Books.Add(book4);

            

            var user = new User();
            user.Name = "saad@gmail.com";
            user.Password = "saad";
            Users.Add(user);

            SaveChanges();
        }
    }
}