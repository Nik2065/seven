using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectFilesStoreController : ControllerBase
    {


        public ProjectFilesStoreController()
        {

        }


        /// <summary>
        /// Сохраняем файл в заданную папку
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("[action]")]
        [Authorize]//TODO: Доделать
        public ActionResult SaveFile(SaveFileRequest request)
        {
            var result = new BaseResponse { Success = true, Msg = "Файл сохранен" };

            try
            {

            }
            catch(Exception ex)
            {

            }

            return Ok(result);
        }
    }


    public class SaveFileRequest
    {
        public string FileName { get; set; }
        public string Extension { get; set; }
        public string FileDataBase64 { get; set; }

        //Файлы различаются по назначению и храняться в рахных папках
        public string DestinationCode { get; set; }


        public int ProjectId { get; set; }
    }

    public class BaseResponse
    {
        public bool Success { get; set; }
        public string Msg { get; set; }
    }

    public static class FilesDestinationCodes
    {
        public const string ProductImageFile = "PRODUCTIMAGEFILE";//относятся к каталогу продуктов
        public const string DesignImageFile = "DESIGNIMAGEFILE";//элементы оформления
    }


}
