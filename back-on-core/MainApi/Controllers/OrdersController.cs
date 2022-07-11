using Common;
using Common.DTO;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        public OrdersController()
        {
            _logger = NLog.LogManager.GetCurrentClassLogger();
            _db = new PsDataContext();
        }

        NLog.Logger _logger;
        PsDataContext _db;


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> GetOrders()
        {
            var result = new BaseResponse{ Message="еще не реализовано" };

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
        public async Task<ActionResult> CreateOrder(CreateOrdertRequestDto request)
        {
            var result = new BaseResponse { Message = "", Success = true };

            try
            {
                //TODO:проверяем что такой заказ уже есть  ?
                var o = new OrderDb 
                {
                    SessionId = request.SessionId.ToString(),
                    CustomerName = request.CustomerName,
                    CustomerAddress = request.CustomerAddress,
                    CustomerEmail = request.CustomerEmail,
                    Created = request.Created
                };


                _db.Orders.Add(o);
                _db.SaveChanges();

            }
            catch(Exception ex)
            {
                _logger.Error(ex);
                result.Message = ex.Message;
                result.Success = false;
            }

            return Ok(result);
        }



    }
}
