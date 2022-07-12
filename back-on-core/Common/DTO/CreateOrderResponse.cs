using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class CreateOrderResponse : BaseResponse
    {
        public CreateOrderResponse()
        {
        }

       public int OrderId { get; set; }

    }


}
