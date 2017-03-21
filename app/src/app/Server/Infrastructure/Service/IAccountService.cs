namespace app.Server.Infrastructure.Service
{
    public interface IAccountService
    {
        bool IsUserValid(string username, string password);
    }
}