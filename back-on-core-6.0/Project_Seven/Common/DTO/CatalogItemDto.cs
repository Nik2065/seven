using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class CatalogItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
    }
}
