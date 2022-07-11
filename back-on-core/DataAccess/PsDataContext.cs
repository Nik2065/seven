using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DataAccess
{
    public class PsDataContext : DbContext
    {

        /*public PsDataContext()
        {
            Database.EnsureCreated();
        }*/

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //var connectionString = "server=localhost;user=root;password=Fgh12345;database=projectseven;";
            var connectionString = "server=192.168.0.110;user=newuser;password=123456;database=projectseven;";
            //var ver = new ServerVersion()

            optionsBuilder.UseMySql(
                    connectionString,
                options => {

                    options.ServerVersion("8.0.29");

                    options.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: System.TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                }
                );
                
        }

        public DbSet<SessionCartDb> SessionCarts { get; set; }

        public DbSet<SessionDb> Sessions { get; set; }

        public DbSet<ProductDb> Products { get; set; }
        public DbSet<OrderDb> Orders { get; set; }
    }
}
