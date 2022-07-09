using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAllCatalogItemsResponse : BaseResponse
    {
        public GetAllCatalogItemsResponse()
        {
            PaginationResult = new GetPageResult<CatalogItemDto>();
        }

        public GetPageResult<CatalogItemDto> PaginationResult { get; set; }
    }
}
