using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace app.Server.Infrastructure.Repository
{
    public interface IRepository<TEntity>
    {
        void Add(TEntity entity);

        void Update(TEntity entity);

        void Delete(TEntity entity);

        IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null);

        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> filter = null);
    }
}
