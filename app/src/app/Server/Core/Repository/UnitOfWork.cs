using app.Server.Core.Model;
using app.Server.Infrastructure.Repository;

namespace app.Server.Core.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDatabaseContext _dbContext;

        public UnitOfWork(IDatabaseContext databaseContext)
        {
            _dbContext = databaseContext;
        }

        public IRepository<Book> BookRepository => new GenericRepository<Book>(_dbContext);
        public IRepository<User> UserRepository => new GenericRepository<User>(_dbContext);
        public IRepository<Checkout> CheckoutRepository => new GenericRepository<Checkout>(_dbContext);


        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {

        }
    }
}
