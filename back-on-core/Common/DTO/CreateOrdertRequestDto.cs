using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class CreateOrdertRequestDto
    {
        public Guid SessionId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerEmail { get; set; }

        public DateTime Created { get; set; }
    }
}
