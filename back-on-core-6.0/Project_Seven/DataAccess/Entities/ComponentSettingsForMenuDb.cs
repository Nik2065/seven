using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("componentsettings_menu")]
    public class ComponentSettingsForMenuDb
    {
        public int Id { get; set; }
        public int ComponentId { get; set; }
        public DateTime Created{ get; set; }
        public int MenuParentItemId { get; set; }
        public int MenuItemOrder { get; set; }
        public string MenuItemText { get; set; }
        public string MenuItemUrl { get; set; }

    }
}
