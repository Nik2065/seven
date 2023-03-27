using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefaultController : ControllerBase
    {
       
        [HttpGet]
        [Route("[action]")]
        public string Index ()
        {
            return "Project seven\r\nMain API starting page";
        }
    }
}
