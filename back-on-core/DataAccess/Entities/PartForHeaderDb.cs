using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("partforheader")]
    public class PartForHeaderDb
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int HeaderTypeId { get; set; }

        [Required]
        public int ProjectId { get; set; }
    }

}
