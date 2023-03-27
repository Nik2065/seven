using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("componentsettings_header")]
    public class ComponentSettingsForHeaderDb
    {
        public int Id { get; set; }

        public int ComponentId { get; set; }
        public string PathToLogo { get; set; }



    }
}
