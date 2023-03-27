using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAllProductsForCategoryRequest
    {
        public string AccountId { get; set; }
        public int CategoryId { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
    }
}
