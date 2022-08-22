using Common;
using Common.DTO;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
using MainApi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        public CategoriesController()
        {
            _db = new PsDataContext();
        }

        PsDataContext _db;


        /// <summary>
        /// Получить список категорий для аккаунта
        /// Аккаунт берем из авторизации
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> GetAccounCategories()
        {
            var result = new GetAccounCategoriesResponse { Success = true, Message = ""};

            try
            {
                var aid = Helper.GetAccountId(User.Claims);
                result.Categories = _db.Categories.Where(x => x.AccountId == aid).ToList();
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }




    }
}
