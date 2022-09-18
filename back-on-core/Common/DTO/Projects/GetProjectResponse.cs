using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO.Projects
{
    public class GetProjectResponse : BaseResponse
    {
        public GetProjectResponse()
        {
        }

        public ProjectDb Project { get; set; }
    }
}
