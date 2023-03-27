using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAccounCategoriesResponse : BaseResponse
    {
        public GetAccounCategoriesResponse()
        {
            Categories = new List<CategoryDb>();
        }

        public List<CategoryDb> Categories { get; set; }
    }
}
