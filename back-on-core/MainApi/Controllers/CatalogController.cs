﻿using Common;
using Common.DTO;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
            _db = new PsDataContext();
        }

        NLog.Logger _logger;
        PsDataContext _db;

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetAllCatalogItems(int? pageSize, int? pageNumber)
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

                var products = _db.Products;


                if(pageSize != null && pageNumber != null)
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
