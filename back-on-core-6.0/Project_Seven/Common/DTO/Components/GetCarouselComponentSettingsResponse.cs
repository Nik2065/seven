using Common.DTO.Projects;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO.Component
{
    public class GetCarouselComponentSettingsResponse : BaseResponse
    {
     
        public GetCarouselComponentSettingsResponse()
        {
            Images = new List<CarouselImage>();
        }

        public List<CarouselImage> Images { get; set; }

    }
}
