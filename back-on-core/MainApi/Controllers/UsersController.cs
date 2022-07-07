using Microsoft.AspNetCore.Mvc;

namespace MainApi.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
