using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DataAccess
{
    public class PsDataContext : DbContext
    {

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

        public DbSet<SessionCartDb> SessionCarts { get; set; }

        public DbSet<SessionDb> Sessions { get; set; }

        public DbSet<ProductDb> Products { get; set; }
    }
}
