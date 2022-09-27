using BusinessLogic;
using Common;
using Common.DTO;
using Common.DTO.Component;
using Common.DTO.Projects;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
using MainApi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
            _logger = NLog.LogManager.GetCurrentClassLogger();
            _mappingLogic = new MappingLogic();
        }

        PsDataContext _db;
        NLog.Logger _logger;
        MappingLogic _mappingLogic;

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
                var aid = Helper.GetAccountId(User.Claims);
                result.Projects = _db.Projects.Where(x => x.AccountId == aid).ToList();
            }
            catch(Exception ex)
            {
                _logger.Error(ex);
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
                var aid = Helper.GetAccountId(User.Claims);
                result.Project = _db.Projects.FirstOrDefault(x => x.AccountId == aid && x.Id == id);
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
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

                var aid = Helper.GetAccountId(User.Claims);
                var p = _db.Projects.FirstOrDefault(item => item.AccountId == aid && item.Id == request.Id);
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
                _logger.Error(ex);
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
            
            using (var t = await _db.Database.BeginTransactionAsync())
            {

                try
                {
                    var aid = Helper.GetAccountId(User.Claims);

                    //TODO: валидация 

                    if (request.ProjectName == null || request.ProjectName.Trim().Length < 5)
                        throw new Exception("Слишком короткое имя проекта");


                    //добавляем проект
                    var p = new ProjectDb
                    {
                        AccountId = aid,
                        Created = DateTime.Now,
                        ProjectName = request.ProjectName,
                        Description = request.ProjectDescription
                    };

                    await _db.Projects.AddAsync(p);
                    await _db.SaveChangesAsync();



                    //добавляем настройки
                    var header = new PartForHeaderDb { ProjectId = p.Id, HeaderTypeId = (int)HeaderTypeEnum.LeftLogo };
                    _db.PartForHeader.Add(header);




                    await _db.SaveChangesAsync();
                    //await t.CommitAsync();
                }
                catch (Exception ex)
                {
                    await t.RollbackAsync();
                    _logger.Error(ex);
                    result.Success = false;
                    result.Message = ex.Message;
                }
            }

            return Ok(result);
        }

        /// <summary>
        /// Получить идентификатор аккаунта по id проекта
        /// </summary>
        /// <param name="projectid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("[action]/{projectid}")]
        public async Task<ActionResult> GetAccountIdByProjectId(int projectid)
        {
            var result = new GetAccountIdByProjectIdResponse { Success = true, Message = "" };

            try
            {
                var p = _db.Projects.FirstOrDefault(item => item.Id == projectid);

                if (p == null)
                    throw new Exception("Проект с таким id:" + projectid + " не найден");

                result.AccountId = p.AccountId.ToString();
            }
            catch(Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }


        [HttpGet]
        [Route("[action]/{projectid}")]
        public async Task<ActionResult> GetProjectPageComponents(int projectid)
        {

            var result = new GetProjectPageComponentsResponse {Success = true, Message = "" };

            try
            {
                //TODO: читаем настройки

                //получаем список компонентов на странице, которые включены

                var pageComponentsFromDb = _db.ProjectPageComponents.Where(item => item.ProjectId == projectid && item.Visible == true).OrderBy(x => x.ComponentOrder).ToList();

                foreach(var dbComponent in pageComponentsFromDb)
                {
                    var component = new ComponentBase();

                    component.ComponentId = dbComponent.Id;
                    component.ComponentOrder = dbComponent.ComponentOrder;
                    component.ComponentGroupId = dbComponent.ComponentGroupId;
                    component.Visible = dbComponent.Visible;


                    //добавляем настройки компонентов
                    if (dbComponent.ComponentGroupId == (short)PageComponentGroupEnum.Header)
                    {
                        var hc = _mappingLogic.MapComponentBaseToT<HeaderComponent>(component);

                        var details = _db.ComponentSettingsForHeader.FirstOrDefault(x => x.ComponentId == dbComponent.Id);
                        if(details != null)
                        {
                            hc.PathToLogo = details.PathToLogo;
                        }

                        result.HeaderComponent = hc;
                    }
                    else if (dbComponent.ComponentGroupId == (short)PageComponentGroupEnum.Footer)
                    {
                        var footer = _mappingLogic.MapComponentBaseToT<FooterComponent>(component);

                        //TODO: заполнять доп поля
                        footer.Address = "адрес 1";
                        footer.Phone = "8495-111-22-33";


                        result.FooterComponent = footer;
                    }
                    else if (dbComponent.ComponentGroupId == (short)PageComponentGroupEnum.Carousel)
                    {
                        var c = _mappingLogic.MapComponentBaseToT<CarouselComponent>(component);

                        //доп параметры компонента
                        /*var images = _db.CarouselImages.Where(x => x.ComponentId == car.ComponentId);

                        if (images != null && images.Any())
                        {
                            foreach (var image in images)
                            {
                                var i = new CarouselImage { OrderNom = image.OrderNom, Path = image.Path, Title = image.Title, SubTitle = image.SubTitle };
                                car.Images.Add(i);
                            }
                        }*/

                        result.BodyPageComponents.Add(c);

                    }
                    else if (dbComponent.ComponentGroupId == (short)PageComponentGroupEnum.GorizontalMenu)
                    {
                        var c = _mappingLogic.MapComponentBaseToT<CarouselComponent>(component);

                        //доп параметры компонента


                        result.BodyPageComponents.Add(c);
                    }
                    else
                    {
                        throw new Exception("Не найдена обработка для группы компонентов:" + dbComponent.ComponentGroupId);
                    }





                }

            }
            catch(Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }


            return Ok(result);
        }


        [HttpGet]
        [Route("[action]/{componentid}")]
        public async Task<ActionResult> GetCarouselComponentSettings(int componentid)
        {
            var result = new GetCarouselComponentSettingsResponse { Success = true, Message = "" };

            try
            {

                var images = _db.CarouselImages.Where(x => x.ComponentId == componentid);

                if (images != null && images.Any())
                {
                    foreach (var image in images)
                    {
                        var i = new CarouselImage { OrderNom = image.OrderNom, Path = image.Path, Title = image.Title, SubTitle = image.SubTitle };
                        result.Images.Add(i);
                    }
                }


            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }



        //
        // тут возвращается только список компонент без подробностей
        //

        //[HttpGet]
        //[Route("[action]/{projectid}")]
        //public async Task<ActionResult> GetProjectPageComponents2(int projectid)
        //{

        //    var result = new GetProjectPageComponentsResponse { Success = true, Message = "" };

        //    try
        //    {
        //        //TODO: читаем настройки

        //        //получаем список компонентов на странице, которые включены

        //        var pageComponentsFromDb = _db.ProjectPageComponents.Where(item => item.ProjectId == projectid && item.Visible == true).OrderBy(x => x.ComponentOrder).ToList();

        //        foreach (var dbComponent in pageComponentsFromDb)
        //        {
        //            var component = new ComponentBase();

        //            component.ComponentId = dbComponent.Id;
        //            component.ComponentOrder = dbComponent.ComponentOrder;
        //            component.ComponentGroupId = dbComponent.ComponentGroupId;
        //            component.Visible = dbComponent.Visible;


        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.Error(ex);
        //        result.Success = false;
        //        result.Message = ex.Message;
        //    }


        //    return Ok(result);
        //}



    }
}
