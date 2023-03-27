using BusinessLogic;
using Common;
using Common.DTO;
using Common.DTO.Component;
using Common.DTO.Projects;
using Common.Enums;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicDataApplication.Controllers
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

       


      

        [HttpGet]
        [Route("[action]/{projectid}")]
        public async Task<ActionResult> GetProjectPageComponents(int projectid)
        {

            var result = new GetProjectPageComponentsResponse { Success = true, Message = "" };

            try
            {
                //TODO: читаем настройки

                //получаем список компонентов на странице, которые включены

                var pageComponentsFromDb = _db.ProjectPageComponents.Where(item => item.ProjectId == projectid && item.Visible == true).OrderBy(x => x.ComponentOrder).ToList();

                foreach (var dbComponent in pageComponentsFromDb)
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
                        if (details != null)
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
            catch (Exception ex)
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
