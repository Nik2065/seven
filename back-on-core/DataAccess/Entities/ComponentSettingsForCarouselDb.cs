using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("componentsettings_carousel")]
    public class ComponentSettingsForCarouselDb
    {
        public int Id { get; set; }

        public int ComponentId { get; set; }

        public DateTime Created { get; set; }

    }
}
