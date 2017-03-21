using app.Server.Core.Model;

namespace app.Server.Infrastructure.Repository
{
    public interface IUnitOfWork
    {
        IRepository<Book> BookRepository { get; }
        IRepository<User> UserRepository { get; }
        IRepository<Checkout> CheckoutRepository { get; }

        void SaveChanges();
    }
}