using Common.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CatalogController : ControllerBase
    {
        public CatalogController()
        {
            _logger = NLog.LogManager.GetCurrentClassLogger();
        }

        NLog.Logger _logger;

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetAllCatalogItems()
        {
            var result = new GetAllCatalogItemsResponse();

            try
            {
                var item1 = new CatalogItemDto { Id = 1, Name = "Product 1", Description = "some usefull product", Cost = 34.5M };
                var item2 = new CatalogItemDto { Id = 2, Name = "Product 2", Description = "some usefull product", Cost = 27.1M };
                var item3 = new CatalogItemDto { Id = 3, Name = "Product 3", Description = "some usefull product", Cost = 6.2M };
                var item4 = new CatalogItemDto { Id = 4, Name = "Product 4", Description = "some usefull product", Cost = 96.42M };

                result.Items.Add(item1);
                result.Items.Add(item2);
                result.Items.Add(item3);
                result.Items.Add(item4);

            }
            catch(Exception ex)
            {
                _logger.Error(ex);

            }

            return Ok(result);
        }
    }
}
