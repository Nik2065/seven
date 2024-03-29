﻿using Common;
using Common.DTO;
using DataAccess;
using DataAccess.Entities;
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
            //_db = new PsDataContext();
        }

        //PsDataContext _db;


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> GetCartBySessionId(Guid sessionId)
        {
            var result = new GetCartResponse { Success = true, Message = ""};

            try
            {
                using (var _db = new PsDataContext())
                {
                    //пример guid eaa2383b-66e4-48a1-b1ee-5c14bf2cb7a6

                    //ищем в базе данных
                    //если находим - возвращаем результат
                    //если не находим, то создаем новую сессию с таким id и пустой корзиной

                    var s = _db.Sessions.FirstOrDefault(x => x.SessionId == sessionId.ToString());

                    if (s == null)
                    {
                        //добавляем сессию
                        var ns = new SessionDb { Created = DateTime.Now, SessionId = sessionId.ToString() };

                        _db.Sessions.Add(ns);
                        _db.SaveChanges();
                    }
                    else
                    {
                        var arr = _db.SessionCarts.Where(x => x.SessionId == sessionId.ToString());
                        foreach (var i in arr)
                        {
                            var d = new CartItemDto
                            {
                                Product = _db.Products.FirstOrDefault(x => x.Id == i.ProductId),
                                Qty = i.ProductQuantity
                            };

                            result.CartItems.Add(d);
                        }
                        //result.CartItems
                    }


                    /*if (sessionId == new Guid("167438a6-4e75-4c15-bd5b-0a6610f92212"))
                    {

                        //result.Created = DateTime.Now.AddMinutes(-30);
                        //result.CartId = sessionId;
                        var item1 = new CatalogItemDto { Id = 1, Name = "Product 1", Description = "some usefull product", Cost = 34.5M };
                        var item2 = new CatalogItemDto { Id = 2, Name = "Product 1", Description = "some usefull product", Cost = 14.5M };

                        result.CartItems.Add(new CartItemDto { Product = item1, Qty = 3});
                        result.CartItems.Add(new CartItemDto { Product = item2, Qty = 1});

                    }*/
                }

            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }



        //[HttpPost]
        //[Route("[action]")]
        //public async Task<ActionResult> AddProductToCart(Guid sessionId, int productId, int quantity)
        //{
        //    var result = new BaseResponse();
        //    try
        //    {
        //    }
        //    catch(Exception ex)
        //    {
        //    }
        //    return Ok(result);
        //}



        /// <summary>
        /// Изменить количество конкретного продукта в корзине
        /// Если "0", то продукт удаляется из корзины
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> ChangeCartProductQuantity(ChangeProductInCartRequest request)
        {
            var result = new BaseResponse { Message = "Продукт изменен", Success = true };

            try
            {
                using (var _db = new PsDataContext())
                {
                    var s = _db.Sessions.FirstOrDefault(x => x.SessionId == request.SessionId.ToString());
                    if (s == null)
                    {
                        _db.Sessions.Add(new SessionDb { Created = DateTime.Now, SessionId = request.SessionId.ToString() });
                        _db.SaveChanges();
                    }
                    //TODO: проверка что такой продукт вообще есть в каталоге


                    var p = _db.SessionCarts.FirstOrDefault(x => x.ProductId == request.ProductId && x.SessionId == request.SessionId.ToString());

                    if (request.NewQuantity == 0)//удаляем из корзины
                    {
                        if (p != null)
                        {
                            _db.SessionCarts.Remove(p);
                        }
                    }
                    else
                    {
                        if (p == null)
                        {
                            p = new SessionCartDb();
                            p.SessionId = request.SessionId.ToString();
                            p.ProductId = request.ProductId;

                            _db.SessionCarts.Add(p);
                        }

                        p.ProductQuantity = request.NewQuantity;
                    }

                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }

        

    }

    public class ChangeProductInCartRequest
    {
        public Guid SessionId { get; set; } 
        public int ProductId { get; set; }
        public int NewQuantity { get; set; }
    }
}
