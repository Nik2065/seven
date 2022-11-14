using Common;
using Common.DTO;
using Common.Enums;
using DataAccess;
using MainApi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Drawing;
using System.IO;
using System.Linq;

namespace MainApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileStoreController : Controller
    {

        public FileStoreController(IConfiguration configuration)
        {
            Configuration = configuration;
            _pathToSaveContent = Configuration["PathToSaveContent:Path"];
            _db = new PsDataContext();
        }

        private readonly IConfiguration Configuration;
        private readonly string _pathToSaveContent = "";
        private PsDataContext _db;


        /// <summary>
        /// Сохраняем файл в заданную папку
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public ActionResult SaveFile(SaveFileRequest request)
        {

            var result = new BaseResponse { Success = true, Message = "Файл сохранен" };

            


            try
            {
                if (string.IsNullOrEmpty(_pathToSaveContent))
                    throw new Exception("Невозможно сохранить файл. Ошибка в конфигурации");


                



                //из авторизации узнаем логин
                //проверяем соответсиве проекту


                var aid = Helper.GetAccountId(User.Claims);
                var projectId = request.ProjectId;
                


                var accountContainsProject = _db.Projects.Where(x => x.AccountId == aid && x.Id == projectId).Any();
                if (!accountContainsProject)
                    throw new Exception("Ошибочный идентификатор проекта. Загрузить файл не удалось");

                //TODO: вести лог загрузки файлов ?
                //data:image/jpeg;base64,/9j/4AAQSkZJ
                var index = request.FileDataBase64.IndexOf("base64,");

                var bytes = new byte[0];

                if (index > 0 && request.FileDataBase64.Length > 1)
                {
                    var b64 = request.FileDataBase64.Substring(index + 7, request.FileDataBase64.Length - (index + 7));
                    bytes = Convert.FromBase64String(b64);
                }

                var ext = request.Extension.Trim().ToLower();
                var type = request.FileType.Trim().ToLower();

                //Разнвые правила для разных типов файлов
                if (request.DestinationCode == FileDestinationCodes.Logo)
                {
                    if (type!.Contains("jpg") && !type.Contains("jpeg") && !type.Contains("png"))
                        throw new Exception("Ошибка: расширение файла должно быть jpg или png. Файл не загружен");

                    //ограничение байтового размера
                    if(bytes.Length > 500*1024)
                        throw new Exception("Ошибка: размер файла должен быть меньше 0,5 мб. Файл не загружен");

                    //ограничение пиксельного размера чтобы не портить дизайн
                    using(var ms = new MemoryStream(bytes))
                    {
                        var img = Image.FromStream(ms);
                        var maxW = 300; var minW = 50;
                        var maxH = 200; var minH = 50;


                        if (img.Width > maxW || img.Width < minW)
                            throw new Exception($"Ошибка: ширина лого больше {maxW} пикселей или меньше {minW}. Загрузите логотип корректного размера. Файл не загружен");

                        if (img.Height > 400 || img.Width < 10)
                            throw new Exception($"Ошибка: высота лого больше {maxH} пикселей или меньше {minH}. Загрузите логотип корректного размера. Файл не загружен");

                    }



                    /*using (var fileStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        using (var image = Image.FromStream(fileStream, false, false))
                        {
                            var height = image.Height;
                            var width = image.Width;
                        }
                    }*/


                    //projectN/logo.png
                    System.IO.File.WriteAllBytes(_pathToSaveContent + @"\project" + projectId + @"\logo." + ext, bytes);
                }
                else if(request.DestinationCode == FileDestinationCodes.ProductImageFile)
                {

                }
                else if (request.DestinationCode == FileDestinationCodes.DesignImageFile)
                {

                }




            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                //return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
