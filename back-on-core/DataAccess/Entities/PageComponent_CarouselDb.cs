using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("pagecomponent_carousel")]
    public class PageComponent_CarouselDb
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

    }
}
