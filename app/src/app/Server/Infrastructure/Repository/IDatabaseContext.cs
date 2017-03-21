using Microsoft.EntityFrameworkCore;

namespace app.Server.Infrastructure.Repository
{
    public interface IDatabaseContext
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        void CreateDatabase();
        int SaveChanges();
    }
}