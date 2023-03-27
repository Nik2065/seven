using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAllProductsRequest
    {
        public string AccountId { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get;set; }
    }
}
