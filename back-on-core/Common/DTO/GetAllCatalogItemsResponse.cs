using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAllCatalogItemsResponse : BaseResponse
    {
        public GetAllCatalogItemsResponse()
        {
            Items = new List<CatalogItemDto>();
        }

        public List<CatalogItemDto> Items { get; set; }
    }
}
