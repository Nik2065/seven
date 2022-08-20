using Common;
using Common.DTO;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Characteristics : Controller
    {
        public Characteristics()
        {
            _db = new PsDataContext();
        }

        PsDataContext _db;


        /// <summary>
        /// Получить список характеристик
        /// Аккаунт берем из авторизации
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> GetAccountCharacteristics()
        {
            var result = new GetAccountCharacteristicsResponse { Success = true, Message = ""};

            try
            {
                var aid = GetAccountId();
                result.Characteristics = _db.TextCharacteristics.Where(x => x.AccountId == aid).ToList();
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }

        

        private Guid GetAccountId()
        {
            var claims = User.Claims;
            var aid = claims.FirstOrDefault(x => x.Type == "accountId")?.ToString();
            aid = aid?.Replace("accountId:", "");
            aid = aid?.Replace(" ", "");
            
            return Guid.Parse(aid);
        }



    }
}
