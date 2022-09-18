using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("categories")]
    public class CategoryDb
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public Guid AccountId { get; set; }
        
        public DateTime Created { get; set; }

        public int ProjectId { get; set; }


    }
}
