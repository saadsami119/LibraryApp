using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using app.Server.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Core.Repository
{
    public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(IDatabaseContext dbContext)
        {
            _dbSet = dbContext.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null)
        {
            if (filter == null)
            {
                return _dbSet;
            }

            return _dbSet.Where(filter);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> filter = null)
        {
            return _dbSet.SingleOrDefault(filter);
        }

    }
}
