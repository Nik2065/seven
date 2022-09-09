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

    //
    // Контроллер для работы конечных сайтов с категориями
    //
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
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]/{accountId}")]
        public async Task<ActionResult> GetAccounCategories(string accountId)
        {
            var result = new GetAccounCategoriesResponse { Success = true, Message = ""};

            try
            {
                var canParse = Guid.TryParse(accountId, out Guid aid);
                if (canParse)
                    result.Categories = _db.Categories.Where(x => x.AccountId == aid).ToList();

            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }


        /// <summary>
        /// Получить данные категории по id
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]/{catId}")]
        public async Task<ActionResult> GetCategory(int catId)
        {
            var result = new GetCategoryResponse { Success = true, Message = "" };

            try
            {
                var one = _db.Categories.FirstOrDefault(x => x.Id == catId);
                if (one == null)
                    throw new Exception($"Категория с id:{catId} не найдена");

                result.Id = one.Id;
                result.Description = one.Description;
                result.Name = one.Name;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }



    }
}
