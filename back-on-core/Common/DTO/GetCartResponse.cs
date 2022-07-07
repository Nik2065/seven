using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetCartResponse : BaseResponse
    {
        public GetCartResponse()
        {
            //CartItems = new Dictionary<CatalogItemDto, int>();
            CartItems = new List<CartItemDto>();
        }

        //item + count
        //public Dictionary<CatalogItemDto, int> CartItems { get; set; }
        public List<CartItemDto> CartItems { get; set; }

    }

    public class CartItemDto
    {
        public int Qty { get; set; }
        //public CatalogItemDto Product { get; set; }
        public ProductDb Product { get; set; }
    }
}
