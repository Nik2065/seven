using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("projects")]
    public class ProjectDb
    {
        public int Id { get; set; }
        public Guid AccountId { get; set; }
        public string ProjectName { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
    }
}
