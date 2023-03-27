﻿using Auth;
using Common;
using Common.DTO;
using Common.DTO.Projects;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminDataApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminProjectsController : Controller
    {
        public AdminProjectsController()
        {
            _db = new PsDataContext();
            _logger = NLog.LogManager.GetCurrentClassLogger();
        }

        PsDataContext _db;
        NLog.Logger _logger;



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


            var result = new BaseResponse { Success = true, Message = "Данные сохранены" };

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
            catch (Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;

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

                    //настройки хеадера по-умолчанию
                    //добавляем компонент хеадера + настройку хеадера
                    var header = new ProjectPageComponent();
                    header.ProjectId = p.Id;
                    header.Visible = true;
                    header.ComponentOrder = 0;
                    header.ComponentGroupId = (short)PageComponentGroupEnum.Header;

                    _db.ProjectPageComponents.Add(header);
                    await _db.SaveChangesAsync();


                    var headerSettings = new ComponentSettingsForHeaderDb();
                    headerSettings.ComponentId = header.Id;
                    headerSettings.PathToLogo = DefaultProjectSettings.PathToDefaultLogo;//путь к дефолтному лого

                    _db.ComponentSettingsForHeader.Add(headerSettings);
                    await _db.SaveChangesAsync();


                    //горизонтальное меню
                    var menu = new ProjectPageComponent();
                    menu.ProjectId = p.Id;
                    menu.Visible = true;
                    menu.ComponentOrder = 1;
                    menu.ComponentGroupId = (short)PageComponentGroupEnum.GorizontalMenu;
                    _db.ProjectPageComponents.Add(menu);
                    await _db.SaveChangesAsync();

                    //настройки меню
                    var menuItem1 = new ComponentSettingsForMenuDb();
                    //дефолтные настройки меню
                    //кроме обязательных ссылок добавляем ссылку на help
                    menuItem1.MenuItemText = "Как пользоваться сайтом";
                    menuItem1.MenuItemUrl = "/help";
                    menuItem1.MenuParentItemId = 0;
                    menuItem1.MenuItemOrder = 0;
                    menuItem1.ComponentId = menu.Id;
                    menuItem1.Created = DateTime.Now;
                    _db.ComponentSettingsForMenuDb.Add(menuItem1);
                    await _db.SaveChangesAsync();



                    //тело страницы
                    //карусель
                    var carousel = new ProjectPageComponent();
                    carousel.ProjectId = p.Id;
                    carousel.Visible = true;
                    carousel.ComponentOrder = 2;
                    carousel.ComponentGroupId = (short)PageComponentGroupEnum.Carousel;
                    _db.ProjectPageComponents.Add(carousel);
                    await _db.SaveChangesAsync();

                    //настройки карусели
                    {
                        var carouselImage1 = new CarouselImageDb();
                        carouselImage1.Path = DefaultProjectSettings.PathToCaroucelImage1;
                        carouselImage1.ComponentId = carousel.Id;
                        carouselImage1.Created = DateTime.Now;
                        carouselImage1.OrderNom = 0;
                        carouselImage1.Title = "Title-1";
                        carouselImage1.SubTitle = "some words";

                        _db.CarouselImages.Add(carouselImage1);
                    }

                    {
                        var carouselImage2 = new CarouselImageDb();
                        carouselImage2.Path = DefaultProjectSettings.PathToCaroucelImage2;
                        carouselImage2.ComponentId = carousel.Id;
                        carouselImage2.Created = DateTime.Now;
                        carouselImage2.OrderNom = 0;
                        carouselImage2.Title = "Title-2";
                        carouselImage2.SubTitle = "some words";

                        _db.CarouselImages.Add(carouselImage2);
                    }

                    await _db.SaveChangesAsync();

                    //футер
                    {
                        var footer = new ProjectPageComponent();
                        footer.ProjectId = p.Id;
                        footer.Visible = true;
                        footer.ComponentOrder = 3;
                        footer.ComponentGroupId = (short)PageComponentGroupEnum.Footer;
                        _db.ProjectPageComponents.Add(footer);
                    }

                    //await _db.SaveChangesAsync();

                    //TODO: настройки футера

                    await _db.SaveChangesAsync();
                    await t.CommitAsync();
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
            catch (Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);
        }

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
            var result = new GetAccountProjectsResponse { Success = true, Message = "" };

            try
            {
                var aid = Helper.GetAccountId(User.Claims);
                result.Projects = _db.Projects.Where(x => x.AccountId == aid).ToList();
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                result.Success = false;
                result.Message = ex.Message;
            }

            return Ok(result);

        }
    }
}
