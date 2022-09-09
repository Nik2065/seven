using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetCategoryResponse : BaseResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


    }
}
