using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities
{
    [Table("accounts")]
    public class AccountDb
    {
        public Guid Id { get; set; }
        public string AccountName { get; set; }
        public DateTime Created { get; set; }

        public string Email { get; set; }
        public string Pwd { get; set; }
    }
}
