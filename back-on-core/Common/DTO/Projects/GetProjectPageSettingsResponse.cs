using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO.Projects
{
    public class GetProjectPageComponentsResponse : BaseResponse
    {
        public GetProjectPageComponentsResponse()
        {
            BodyPageComponents = new List<ComponentBase>();
        }


        //public HeaderComponent headerComponent { get; set; }
        //public GorizontalMenuComponent gorizontalMenu { get; set; }
        //public CarouselComponent carouselComponent { get; set; }

        //public ProductsOnMainPageComponent productsOnMainPageComponent { get; set; }


        public HeaderComponent HeaderComponent { get; set; }
        public FooterComponent FooterComponent { get; set; }
        public List<ComponentBase> BodyPageComponents { get; set; }



    }


    
    public class ComponentBase
    {
        public int ComponentId { get; set; }

        //Порядок отображения на странице
        public int ComponentOrder { get; set; }

        //включен ли компонент
        public bool Visible { get; set; }

        public int ComponentGroupId { get; set; }
    }


    public class HeaderComponent : ComponentBase
    {
        public string PathToLogo { get; set; }
    }

    public class FooterComponent : ComponentBase
    {
        public string Phone { get; set; }
        public string Address { get; set; }


    }




    public class GorizontalMenuComponent : ComponentBase
    {
        public GorizontalMenuComponent()
        {
            Links = new List<LinkData>();
        }

        public List<LinkData> Links { get; set; }
    }

    public class CarouselComponent 
    {
        public List<CarouselImage> Images { get; set; }
    }

    public class CarouselImage
    {
        public string Path { get; set; }
        public int OrderNom { get; set; }
    }

    public class ProductsOnMainPageComponent : ComponentBase
    {

    }

    public class LinkData
    {
        public string Href { get; set; }
        public string LinkText { get; set; }

        public string Title { get; set; }
        public string Alt { get; set; }
    }


}
