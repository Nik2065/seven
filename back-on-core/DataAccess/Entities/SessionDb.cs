using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("sessions")]
    public class SessionDb
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public DateTime Created { get; set; }
    }
}
