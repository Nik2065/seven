using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("partforbody")]
    public class PartForBodyDb
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        public int BodyTypeId { get; set; }

        [Required]
        public int PageOrderId { get; set; }
    }

}
