using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class CreateNewAccountRequest
    {
        
        public string EmailAsLogin { get; set; }
        public string AccountName { get; set; }
        public string Password { get; set; }
    }
}
