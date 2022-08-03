using Common.DTO;
using DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : Controller
    {
        public ProjectsController()
        {
            _db = new PsDataContext();
        }

        PsDataContext _db;


        /// <summary>
        /// Получить список проектов
        /// Аккаунт берем из авторизации
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> GetAccountProjects()
        {
            var result = new GetAccountProjectsResponse { Success = true, Message = ""};

            try
            {
                //var a = _db.Accounts.FirstOrDefault(x => x.Email == User.Identity.Name);
                var claims = User.Claims;
                var aid = claims.FirstOrDefault(x => x.Type == "accountId")?.ToString();
                aid = aid?.Replace("accountId:", "");
                aid = aid?.Replace(" ", "");
                result.Projects = _db.Projects.Where(x => x.AccountId.ToString() == aid).ToList();
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }
    }
}
