using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace DataAccess
{
    public class PsDataContext : DbContext
    {
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
            //var connectionString = "server=localhost;user=root;password=Fgh12345;database=projectseven;";
            //var ver = new MySqlServerVersion(ServerVersion.AutoDetect(connectionString));
            //var t = new ServerVersion();
            //var ver = ServerVersion.AutoDetect(connectionString);
            //var serverVersion = new MySqlServerVersion(new Version(8, 0, 27));


            //optionsBuilder.UseMySql(connectionString);
            
            //optionsBuilder.UseMySql("server=localhost;user=root;password=Fgh12345;database=projectseven;", b => b.ServerVersion(new ServerVersion()));
        //}



        public PsDataContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "server=localhost;user=root;password=Fgh12345;database=projectseven;";

            optionsBuilder.UseMySql(
                    connectionString,
                    mySqlOptions => mySqlOptions.ServerVersion("8.0.29")

                );
        }

        public DbSet<CartSession> CartSessions { get; set; }


    }

    [Table("cartsessions")]
    public class CartSession
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public DateTime Created { get; set; } 
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
    }

    [Table("sessions")]
    public class Session
    {
        public int Id { get; set; }
        public string SessionId { get; set; }
        public DateTime Created { get; set; }
    }
}
