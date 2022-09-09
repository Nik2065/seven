using Common;
using Common.DTO;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        public ProductsController()
        {
            _logger = NLog.LogManager.GetCurrentClassLogger();
            _db = new PsDataContext();
        }

        NLog.Logger _logger;
        PsDataContext _db;

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> GetAllProducts(GetAllProductsRequest request)
        {
            var result = new GetAllCatalogItemsResponse { Success = true, Message = ""};

            try
            {
                /*var item1 = new CatalogItemDto { Id = 1, Name = "Product 1", Description = "some usefull product", Cost = 34.5M };
                var item2 = new CatalogItemDto { Id = 2, Name = "Product 2", Description = "some usefull product", Cost = 27.1M };
                var item3 = new CatalogItemDto { Id = 3, Name = "Product 3", Description = "some usefull product", Cost = 6.2M };
                var item4 = new CatalogItemDto { Id = 4, Name = "Product 4", Description = "some usefull product", Cost = 96.42M };

                result.Items.Add(item1);
                result.Items.Add(item2);
                result.Items.Add(item3);
                result.Items.Add(item4);*/

                var canParse = Guid.TryParse(request.AccountId, out Guid aid);

                if (!canParse)
                    throw new Exception("Ошибка в идентификаторе аккаунта");

                var products = _db.Products.Where(item => item.AccountId == aid);


                if (request.PageSize != null && request.PageNumber != null)
                {
                    //разбиваем на страницы
                    var pageResult = ListToPages<ProductDb>.GetPage(products, (int)request.PageSize, (int)request.PageNumber);
                    result.PaginationResult.ResultList = GetCatalogItemDtoList(pageResult.ResultList).AsQueryable();
                }
                else
                {
                    result.PaginationResult.ResultList = GetCatalogItemDtoList(products).AsQueryable();
                }

            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("[action]/{accountId}/{catId}/{pageSize}/{pageNumber}")]
        public async Task<ActionResult> GetAllProductsForCategory(string accountId, int catId, int? pageSize, int? pageNumber)
        {
            var result = new GetAllCatalogItemsResponse { Success = true, Message = "" };

            try
            {
                /*var item1 = new CatalogItemDto { Id = 1, Name = "Product 1", Description = "some usefull product", Cost = 34.5M };
                var item2 = new CatalogItemDto { Id = 2, Name = "Product 2", Description = "some usefull product", Cost = 27.1M };
                var item3 = new CatalogItemDto { Id = 3, Name = "Product 3", Description = "some usefull product", Cost = 6.2M };
                var item4 = new CatalogItemDto { Id = 4, Name = "Product 4", Description = "some usefull product", Cost = 96.42M };

                result.Items.Add(item1);
                result.Items.Add(item2);
                result.Items.Add(item3);
                result.Items.Add(item4);*/

                var canParse = Guid.TryParse(accountId, out Guid aid);

                if (!canParse)
                    throw new Exception("Передан некорретный индентификатор аккаунта");


                var products = _db.Products.Where(item => item.AccountId == aid && item.MainCategoryId == catId);


                if (pageSize != null && pageNumber != null)
                {
                    //разбиваем на страницы
                    var pageResult = ListToPages<ProductDb>.GetPage(products, (int)pageSize, (int)pageNumber);
                    result.PaginationResult.ResultList = GetCatalogItemDtoList(pageResult.ResultList).AsQueryable();
                }
                else
                {
                    result.PaginationResult.ResultList = GetCatalogItemDtoList(products).AsQueryable();
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }


        /// <summary>
        /// Описание продукта из каталога товаров
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetProduct(int productId)
        {
            var result = new GetProductResponse { Success = true, Message = ""};

            try
            {
                result.Product = _db.Products.FirstOrDefault(x => x.Id == productId);

            }
            catch(Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }


            return Ok(result);
        }




        private List<CatalogItemDto> GetCatalogItemDtoList(IQueryable<ProductDb> items)
        {
            var result = new List<CatalogItemDto>();
            foreach (var product in items)
            {
                var one = new CatalogItemDto { Id = product.Id, Name = product.Name, Description = product.Description, Cost = product.Cost };
                result.Add(one);
            }

            return result;
        }
    }
}
