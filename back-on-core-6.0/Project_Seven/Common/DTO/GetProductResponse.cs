using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetProductResponse : BaseResponse
    {
        public ProductDb Product { get; set; }
    }
}
