using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class SaveProjectMainDataRequest
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
    }
}
