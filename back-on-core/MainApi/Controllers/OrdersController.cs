using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {

        public async Task<ActionResult> GetOrders()
        {
            var result = new { };

            try
            {

            }
            catch(Exception ex)
            {

            }

            return Ok(result);
        }


    }
}
