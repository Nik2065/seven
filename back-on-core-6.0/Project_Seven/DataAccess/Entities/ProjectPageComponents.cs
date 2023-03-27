using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("project_pagecomponents")]
    public class ProjectPageComponent
    {
        //Идентификатор компонента
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int ComponentOrder { get; set; }

        public bool Visible { get; set; }
        public short ComponentGroupId { get; set; }

    }
}
