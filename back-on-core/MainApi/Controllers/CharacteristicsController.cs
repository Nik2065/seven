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
                var aid = Helper.GetAccountId(User.Claims);
                result.Characteristics = _db.TextCharacteristics.Where(x => x.AccountId == aid).ToList();
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }


        /// <summary>
        /// Создание новой характеристики для аккаунта 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> CreateCharacteristic(CreateCharacteristicRequest request)
        {
            var result = new BaseResponse { Success = true, Message = "Характеристика создана" };

            try
            {
                //TODO: проверки
                //не добавляем слишком короткие характеристики и уде добавленные

                if(string.IsNullOrEmpty(request.CName) || request.CName.Length < 3)
                    throw new Exception("Слишком короткое имя характеристики. Имя должно быть больше 2х символов");


                var tmp = _db.TextCharacteristics.FirstOrDefault(x => x.СName == request.CName.Trim());
                if (tmp != null)
                    throw new Exception("Характеристика с таким именем уже была добавлена ранее");



                var aid = Helper.GetAccountId(User.Claims);
                var c = new TextCharacteristicDb();
                c.СName = request.CName.Trim();
                c.Description = request.Description.Trim();
                c.AccountId = aid;
                c.Created = DateTime.Now;


                _db.TextCharacteristics.Add(c);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                return BadRequest(result);
            }

            return Ok(result);

        }

        /// <summary>
        /// Удаление характеристики для аккаунта 
        /// Проверяем что она еще не использовалась
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> DeleteCharacteristic(DeleteCharacteristicRequest request)
        {
            var result = new BaseResponse { Success = true, Message = "Характеристика удалена" };

            try
            {
                var aid = Helper.GetAccountId(User.Claims);
                var one  = _db.TextCharacteristics.FirstOrDefault(item => item.Id == request.CharacteristicId && item.AccountId == aid);

                if (one == null)
                    throw new Exception("Характеристика с таким id не найдена");

                _db.TextCharacteristics.Remove(one);
                _db.SaveChanges();
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
