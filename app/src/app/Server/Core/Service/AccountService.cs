using app.Server.Core.Model;
using app.Server.Infrastructure.Repository;
using app.Server.Infrastructure.Service;

namespace app.Server.Core.Service
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<User> _userRepository;

        public AccountService(IUnitOfWork uow)
        {
             _userRepository = uow.UserRepository;
        }

        public bool IsUserValid(string username , string password)
        {
          return  _userRepository.SingleOrDefault(x => x.Name == username && x.Password == password) != null;
        }
    }
}
