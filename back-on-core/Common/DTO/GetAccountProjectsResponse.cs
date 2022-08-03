using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class GetAccountProjectsResponse : BaseResponse
    {
        public GetAccountProjectsResponse()
        {
            Projects = new List<ProjectDb>();
        }


        public List<ProjectDb> Projects { get; set; }
    }
}
