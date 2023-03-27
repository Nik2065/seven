using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("productcategories")]
    public class ProductCategoryDb
    {
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public Guid AccountId { get; set; }
        public DateTime Created { get; set; }
    }
}
