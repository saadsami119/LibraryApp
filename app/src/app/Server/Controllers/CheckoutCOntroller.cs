using System;
using System.Collections.Generic;
using System.Linq;
using app.Server.Core.Model;
using app.Server.Core.ViewModel;
using app.Server.Infrastructure.Service;
using Microsoft.AspNetCore.Mvc;

namespace app.Server.Controllers
{
    [Route("api/[controller]")]
    public class CheckoutController : Controller
    {
        private readonly ICheckoutService _checkoutService;

        public CheckoutController(ICheckoutService checkoutService)
        {
            _checkoutService = checkoutService;
        }

        [HttpPost]
        public IActionResult CheckoutBook([FromBody]CheckoutViewModel checkoutViewModel)
        {
            try
            {
                _checkoutService.Checkout(checkoutViewModel.Books, checkoutViewModel.UserId);
                return Json(new JsonResponse { Data = true, Successful = true, Error = null });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponse { Data = null, Successful = false, Error = ex.Message });
            }
        }


        [HttpGet("user/{username}")]

        public IActionResult GetCheckedoutBooks(string username)
        {
            try
            {
                var checkoutHistory = _checkoutService.GetCheckedoutBooks(username);
                List<object> checkoutList = new List<object>();

                foreach (var checkoutbyDate in checkoutHistory.GroupBy(x=> x.Date.Date))
                {
                    checkoutList.Add(new { Date = checkoutbyDate.Key, books = checkoutbyDate.SelectMany(x=>x.CheckoutDetails.Select(y=>y.Book.Name)) });
                }
                return Json(new JsonResponse { Data = checkoutList, Successful = true, Error = null });
            }

            catch (Exception ex)
            {
                return Json(new JsonResponse { Data = null, Successful = false, Error = ex.Message });
            }
        }

    }
}
