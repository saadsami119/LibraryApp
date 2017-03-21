using System;
using System.Collections.Generic;
using System.Linq;
using app.Server.Core.Model;
using app.Server.Infrastructure.Repository;
using app.Server.Infrastructure.Service;

namespace app.Server.Core.Service
{
    public class CheckoutService : ICheckoutService
    {
       private readonly IUnitOfWork _uow;

        public CheckoutService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public void Checkout(IEnumerable<Book> books, string username)
        {
            var checkout = new Checkout
            {
                Date = DateTime.Now,
                User = _uow.UserRepository.SingleOrDefault(x => x.Name.ToLower() == username.ToLower())
            };
            checkout.CheckoutDetails.AddRange(books.Select(x => new CheckoutDetails { BookId = x.Id, Checkout = checkout }));

            _uow.CheckoutRepository.Add(checkout);
            _uow.SaveChanges();
        }
    }
}
