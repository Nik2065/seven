using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("sessioncarts")]
    public class SessionCartDb
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public DateTime Created { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
    }
}
