using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class SaveFileRequest
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string Extension { get; set; }
        public string FileDataBase64 { get; set; }

        //Файлы различаются по назначению и храняться в рахных папках
        public string DestinationCode { get; set; }


        public int ProjectId { get; set; }
    }
}
