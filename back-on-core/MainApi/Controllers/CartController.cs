using Common;
using Common.DTO;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        public CartController()
        {
            _db = new PsDataContext();
        }

        PsDataContext _db;


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetCartBySessionId(Guid sessionId)
        {
            var result = new GetCartResponse();

            try
            {
                //пример guid eaa2383b-66e4-48a1-b1ee-5c14bf2cb7a6

                //ищем в базе данных
                //если находим - возвращаем результат
                //если не находим, то создаем новую сессию с таким id и пустой корзиной

                var dbItem = _db.CartSessions.FirstOrDefault(x=>x.SessionId == sessionId.ToString());

                if(dbItem == null)
                {

                }






                if (sessionId == new Guid("167438a6-4e75-4c15-bd5b-0a6610f92212"))
                {

                    //result.Created = DateTime.Now.AddMinutes(-30);
                    //result.CartId = sessionId;
                    var item1 = new CatalogItemDto { Id = 1, Name = "Product 1", Description = "some usefull product", Cost = 34.5M };
                    var item2 = new CatalogItemDto { Id = 2, Name = "Product 1", Description = "some usefull product", Cost = 14.5M };

                    result.CartItems.Add(new CartItemDto { Product = item1, Qty = 3});
                    result.CartItems.Add(new CartItemDto { Product = item2, Qty = 1});

                }

                result.Message = "";
                result.Success = true;
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = "";
            }

            return Ok(result);
        }



        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> AddProductToCart(Guid sessionId, int productId, int quantity)
        {
            var result = new BaseResponse();

            try
            {

            }
            catch(Exception ex)
            {

            }

            return Ok(result);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> DecrementProductInCart(Guid sessionId, int productId, int quantity)
        {
            var result = new BaseResponse();

            try
            {

            }
            catch (Exception ex)
            {

            }

            return Ok(result);
        }

    }
}
