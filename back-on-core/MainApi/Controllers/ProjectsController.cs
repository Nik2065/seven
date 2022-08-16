using Common;
using Common.DTO;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
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
                var aid = GetAccountId();
                result.Projects = _db.Projects.Where(x => x.AccountId == aid).ToList();
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }

        /// <summary>
        /// Получить настройки конкретного проекта
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]/{id}")]
        [Authorize]
        //public async Task<ActionResult> GetProject(GetProjectRequest request)
        public async Task<ActionResult> GetProject(int id)
        {
            var result = new GetProjectResponse { Success = true, Message = "" };

            try
            {
                //var a = _db.Accounts.FirstOrDefault(x => x.Email == User.Identity.Name);
                var aid = GetAccountId();
                result.Project = _db.Projects.FirstOrDefault(x => x.AccountId == aid && x.Id == id);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }

        /// <summary>
        /// Основные настройки проекта
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> SaveProjectMainData(SaveProjectMainDataRequest request)
        {
            

            var result = new BaseResponse { Success=true, Message = "Данные сохранены"};
            
            try
            {

                var accountId = GetAccountId();
                var p = _db.Projects.FirstOrDefault(item => item.AccountId == accountId && item.Id == request.Id);
                if (p == null)
                    throw new Exception("Проект с id:" + request.Id + " не найден");

                //TODO: валидация 

                if (request.ProjectName == null || request.ProjectName.Trim().Length < 5)
                    throw new Exception("Слишком короткое имя проекта");



                p.ProjectName = request.ProjectName.Trim();
                p.Description = request.Description;
                await _db.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                result.Success=false;
                result.Message=ex.Message;

                return BadRequest(result);
            }

            return Ok(result);
        }

        
        /// <summary>
        /// Сохранение данных, отвечающих за отображение сайта
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> SaveProjectPageSettings(SaveProjectPageSettingsRequest request)
        {
            var result = new BaseResponse { Success = true, Message = "" };

            return Ok(result);
        }

        /// <summary>
        /// Создание проекта с настройками по-умолчанию
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public async Task<ActionResult> CreateProject(CreateProjectRequest request)
        {
            var result = new BaseResponse { Success = true, Message = "Проект создан" };

            try
            {
                var aid = GetAccountId();

                var t = _db.Database.BeginTransaction();


                //добавляем проект
                var p = new ProjectDb { 
                    AccountId = aid, 
                    Created = DateTime.Now, 
                    ProjectName = request.ProjectName, 
                    Description = request.ProjectDescription 
                };

                await _db.Projects.AddAsync(p);
                await _db.SaveChangesAsync();




                //добавляем настройки
                var header = new PartForHeaderDb { ProjectId = p.Id, HeaderTypeId = (int)HeaderTypeEnum.LeftLogo};
                _db.PartForHeader.Add(header);





                await _db.SaveChangesAsync();
                await t.CommitAsync();
            }
            catch(Exception ex)
            {

            }


            return Ok(result);
        }

        private Guid GetAccountId()
        {
            var claims = User.Claims;
            var aid = claims.FirstOrDefault(x => x.Type == "accountId")?.ToString();
            aid = aid?.Replace("accountId:", "");
            aid = aid?.Replace(" ", "");
            
            return Guid.Parse(aid);
        }



    }
}
