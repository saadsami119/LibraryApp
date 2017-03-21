using app.Server.Core.Model;
using app.Server.Infrastructure.Service;
using Microsoft.AspNetCore.Mvc;

namespace app.Server.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("/api/account/login/username/{username}/password/{password}")]
        public IActionResult VerifyUser(string username, string password)
        {
            bool isValid = _accountService.IsUserValid(username, password);
            return Json(new JsonResponse { Successful = true, Error = string.Empty, Data = isValid });
        }
    }
}